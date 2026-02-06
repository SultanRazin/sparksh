import repl.{ReplContext, Initializer}
import repl.Initializer._
import completion.{CompletionHandler, CompletionResult}
import command.CommandHandler
import listener.ProgressListener

import java.io._
import scala.tools.nsc.Settings

object Main {
  def main(args: Array[String]): Unit = {
    val context = ReplContext.create()
    val repl = context.repl

    val settings = new Settings()
    settings.usejavacp.value = true

    repl.createInterpreter(settings)
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
      override def complete(code: String, cursor: Int): CompletionResult = {
        repl.intp.presentationCompile(cursor, code) match {
          case Left(_) => CompletionResult(cursor, List.empty)
          case Right(r) =>
            val (completionCursor, candidates) = r.candidates(0)
            CompletionResult(completionCursor, candidates.toList)
        }
      }
    }

    val stdin = new BufferedReader(new InputStreamReader(System.in))
    CommandHandler.runLoop(context, stdin, completionHandler)
  }
}
