import command.CommandHandler
import completion.{CompletionHandler, CompletionResult}
import listener.ProgressListener
import repl.Initializer._
import repl.ReplContext

import java.io._
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.PresentationCompilerCompleter

object Main {
  def main(args: Array[String]): Unit = {
    val context = ReplContext.create()
    val repl = context.repl

    val settings = new Settings()
    settings.usejavacp.value = true

    repl.settings = settings
    repl.createInterpreter()
    repl.intp.bind("spark", context.spark)
    repl.intp.bind("sc", context.spark.sparkContext)
    repl.intp.interpret("import spark.implicits._")
    repl.intp.interpret("import spark.sql")
    repl.intp.interpret("import org.apache.spark.sql.functions._")

    context.spark.sparkContext.addSparkListener(
      new ProgressListener(context.originalOut)
    )

    sendMetadata(context)
    sendFunctions(context)

    val completionHandler = new CompletionHandler {
      private val completer = new PresentationCompilerCompleter(repl.intp)

      override def complete(code: String, cursor: Int): CompletionResult = {
        val result = completer.complete(code, cursor)
        CompletionResult(result.cursor, result.candidates.toList)
      }
    }

    val stdin = new BufferedReader(new InputStreamReader(System.in))
    CommandHandler.runLoop(context, stdin, completionHandler)
  }
}
