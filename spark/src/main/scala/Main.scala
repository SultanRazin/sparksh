import org.apache.spark.repl.SparkILoop
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

    val repl = new SparkILoop(inputReader, printWriter)

    val settings = new Settings()
    settings.usejavacp.value = true

    repl.createInterpreter(settings)
    repl.initializeSpark()

    val sparkObj = repl.intp.valueOfTerm("spark")
    sparkObj match {
      case Some(spark: org.apache.spark.sql.SparkSession) =>
        spark.sparkContext.addSparkListener(new ProgressListener(originalOut))
      case _ =>
    }

    replOutput.getBuffer.setLength(0)

    originalOut.println(write(Obj("status" -> "ready")))
    originalOut.flush()

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