import org.apache.spark.repl.SparkILoop
import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import ujson._

import java.io._
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.Results


object Main {
  def main(args: Array[String]): Unit = {
    val originalOut = System.out
    val switchableOut = new SwitchableOutputStream(originalOut)
    System.setOut(new PrintStream(switchableOut, true))

    val replOutput = new StringWriter()
    val printWriter = new PrintWriter(replOutput, true)
    val inputReader = new BufferedReader(new StringReader(""))

    val conf = new SparkConf()
    val spark = SparkSession.builder()
      .config(conf)
      .getOrCreate()

    val settings = new Settings()
    settings.usejavacp.value = true

    val jarsConfig = spark.conf.getOption("spark.jars").getOrElse("")
    if (jarsConfig.nonEmpty) {
      val jarPaths = jarsConfig.split(",")
        .map(_.trim)
        .filter(_.nonEmpty)
        .map { jar =>
          if (jar.startsWith("file:")) jar.stripPrefix("file:") else jar
        }
        .filter(path => new java.io.File(path).exists())
      if (jarPaths.nonEmpty) {
        val existingCp = settings.classpath.value
        val newCp = if (existingCp.isEmpty) jarPaths.mkString(java.io.File.pathSeparator)
                    else existingCp + java.io.File.pathSeparator + jarPaths.mkString(java.io.File.pathSeparator)
        settings.classpath.value = newCp
      }
    }

    val repl = new SparkILoop(inputReader, printWriter)
    repl.createInterpreter(settings)

    repl.intp.bind("spark", spark)
    repl.intp.bind("sc", spark.sparkContext)
    repl.intp.interpret("import spark.implicits._")
    repl.intp.interpret("import spark.sql")
    repl.intp.interpret("import org.apache.spark.sql.functions._")

    spark.sparkContext.addSparkListener(new ProgressListener(originalOut))
    val sparkVersion = spark.version
    val scalaVersion = util.Properties.versionNumberString
    val master = spark.sparkContext.master

    replOutput.getBuffer.setLength(0)

    originalOut.println(write(Obj(
      "status" -> "ready",
      "sparkVersion" -> sparkVersion,
      "scalaVersion" -> scalaVersion,
      "master" -> master
    )))
    originalOut.flush()

    try {
      val functionRegistry = spark.sessionState.functionRegistry
      val functions = functionRegistry.listFunction()
      val functionsDesc: List[Obj] = functions.map(f => {
        val info = functionRegistry.lookupFunction(f)
        val usage = info.map(_.getUsage).getOrElse("")
        val extended = info.map(_.getExtended).getOrElse("")
        val examples = info.map(_.getExamples).getOrElse("")
        Obj(
          "name" -> f.funcName,
          "usage" -> usage,
          "extended" -> extended,
          "examples" -> examples
        )
      }).toList
      originalOut.println(write(Obj("type" -> "functions", "functions" -> functionsDesc)))
      originalOut.flush()
    } catch {
      case _: Exception => // Ignore errors in listing functions
    }

    val stdin = new BufferedReader(new InputStreamReader(System.in))
    var running = true

    while (running) {
      val line = stdin.readLine()
      if (line == null) {
        running = false
      } else {
        try {
          val request = read(line)
          val cmd = request("cmd").str

          cmd match {
            case "eval" =>
              val code = request("code").str
              replOutput.getBuffer.setLength(0)
              switchableOut.startCapture()

              val result = repl.intp.interpret(code)
              System.out.flush()

              val stdoutOutput = switchableOut.stopCapture()
              val replOutputStr = replOutput.toString.trim

              val output = Seq(stdoutOutput, replOutputStr).map(_.trim).filter(_.nonEmpty).mkString("\n")

              val status = result match {
                case Results.Success => "ok"
                case Results.Error => "error"
                case Results.Incomplete => "incomplete"
              }
              originalOut.println(write(Obj("status" -> status, "output" -> output)))

            case "complete" =>
              val code = request("code").str
              val cursor = request.obj.get("cursor").map(_.num.toInt).getOrElse(code.length)
              val result = repl.intp.presentationCompile(cursor, code)
              result match {
                case Left(_) =>
                  originalOut.println(write(Obj("status" -> "ok", "completions" -> Arr(), "cursor" -> cursor)))
                case Right(r) =>
                  val (completionCursor, candidates) = r.candidates(0)
                  originalOut.println(write(Obj(
                    "status" -> "ok",
                    "completions" -> candidates,
                    "cursor" -> completionCursor
                  )))
              }

            case "quit" =>
              running = false
              originalOut.println(write(Obj("status" -> "bye")))

            case _ =>
              originalOut.println(write(Obj("status" -> "error", "output" -> s"Unknown command: $cmd")))
          }
        } catch {
          case e: Exception => switchableOut.stopCapture()
            originalOut.println(write(Obj("status" -> "error", "output" -> e.getMessage)))
        }
        originalOut.flush()
      }
    }

    repl.closeInterpreter()
  }
}