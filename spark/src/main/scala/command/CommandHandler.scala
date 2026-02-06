package command

import command.Command._
import completion.CompletionHandler
import repl.ReplContext
import ujson._

import java.io.BufferedReader
import scala.annotation.tailrec
import scala.tools.nsc.interpreter.Results
import scala.util.Try

object CommandHandler {

  def parse(line: String): Either[String, Command] = {
    Try(read(line)).toEither.left.map(_.getMessage).flatMap { request =>
      val cmd = request("cmd").str
      cmd match {
        case "eval" => Right(Eval(request("code").str))
        case "complete" =>
          val code = request("code").str
          val cursor =
            request.obj.get("cursor").map(_.num.toInt).getOrElse(code.length)
          Right(Complete(code, cursor))
        case "quit" => Right(Quit)
        case other  => Left(s"Unknown command: $other")
      }
    }
  }

  @tailrec
  def runLoop(
      context: ReplContext,
      stdin: BufferedReader,
      completionHandler: CompletionHandler
  ): Unit = {
    val line = stdin.readLine()
    if (line == null) {
      context.repl.closeInterpreter()
      return
    }

    val continue = handleCommand(context, parse(line), completionHandler)
    if (continue) runLoop(context, stdin, completionHandler)
    else context.repl.closeInterpreter()
  }

  private def handleCommand(
      context: ReplContext,
      cmd: Either[String, Command],
      completionHandler: CompletionHandler
  ): Boolean = cmd match {
    case Left(error) =>
      sendResponse(context, Obj("status" -> "error", "output" -> error))
      true
    case Right(Eval(code)) =>
      handleEval(context, code)
      true
    case Right(Complete(code, cursor)) =>
      handleComplete(context, code, cursor, completionHandler)
      true
    case Right(Quit) =>
      sendResponse(context, Obj("status" -> "bye"))
      false
  }

  private def handleEval(context: ReplContext, code: String): Unit = {
    context.replOutput.getBuffer.setLength(0)
    context.switchableOut.startCapture()

    val result = Try(context.repl.intp.interpret(code))
    System.out.flush()

    val stdoutOutput = context.switchableOut.stopCapture()
    val replOutputStr = context.replOutput.toString.trim
    val output = Seq(stdoutOutput, replOutputStr)
      .map(_.trim)
      .filter(_.nonEmpty)
      .mkString("\n")

    result match {
      case scala.util.Success(r) =>
        val status = r match {
          case Results.Success    => "ok"
          case Results.Error      => "error"
          case Results.Incomplete => "incomplete"
        }
        sendResponse(context, Obj("status" -> status, "output" -> output))
      case scala.util.Failure(e) =>
        sendResponse(
          context,
          Obj("status" -> "error", "output" -> e.getMessage)
        )
    }
  }

  private def handleComplete(
      context: ReplContext,
      code: String,
      cursor: Int,
      handler: CompletionHandler
  ): Unit = {
    val result = Try(handler.complete(code, cursor))
    result match {
      case scala.util.Success(r) =>
        sendResponse(
          context,
          Obj(
            "status" -> "ok",
            "completions" -> r.candidates,
            "cursor" -> r.cursor
          )
        )
      case scala.util.Failure(_) =>
        sendResponse(
          context,
          Obj("status" -> "ok", "completions" -> Arr(), "cursor" -> cursor)
        )
    }
  }

  private def sendResponse(context: ReplContext, response: Obj): Unit = {
    context.originalOut.println(write(response))
    context.originalOut.flush()
  }
}
