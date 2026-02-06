package repl

import org.apache.spark.SparkConf
import org.apache.spark.repl.SparkILoop
import org.apache.spark.sql.SparkSession

import java.io._
import scala.tools.nsc.Settings

case class ReplContext(
    spark: SparkSession,
    repl: SparkILoop,
    originalOut: PrintStream,
    switchableOut: SwitchableOutputStream,
    replOutput: StringWriter
)

object ReplContext {
  def create(): ReplContext = {
    val originalOut = System.out
    val switchableOut = new SwitchableOutputStream(originalOut)
    System.setOut(new PrintStream(switchableOut, true))

    val replOutput = new StringWriter()
    val printWriter = new PrintWriter(replOutput, true)
    val inputReader = new BufferedReader(new StringReader(""))

    val conf = new SparkConf()
    val spark = SparkSession.builder().config(conf).getOrCreate()

    val settings = new Settings()
    settings.usejavacp.value = true

    val jarsConfig = spark.conf.getOption("spark.jars").getOrElse("")
    if (jarsConfig.nonEmpty) {
      val jarPaths = jarsConfig
        .split(",")
        .map(_.trim)
        .filter(_.nonEmpty)
        .map { jar =>
          if (jar.startsWith("file:")) jar.stripPrefix("file:") else jar
        }
        .filter(path => new java.io.File(path).exists())
      if (jarPaths.nonEmpty) {
        val existingCp = settings.classpath.value
        val newCp =
          if (existingCp.isEmpty) jarPaths.mkString(java.io.File.pathSeparator)
          else
            existingCp + java.io.File.pathSeparator + jarPaths.mkString(
              java.io.File.pathSeparator
            )
        settings.classpath.value = newCp
      }
    }

    val repl = new SparkILoop(inputReader, printWriter)
    ReplContext(spark, repl, originalOut, switchableOut, replOutput)
  }
}
