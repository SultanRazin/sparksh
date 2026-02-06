package command

sealed trait Command

object Command {
  case class Eval(code: String) extends Command
  case class Complete(code: String, cursor: Int) extends Command
  case object Quit extends Command
}
