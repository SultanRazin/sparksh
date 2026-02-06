package completion

case class CompletionResult(cursor: Int, candidates: List[String])

trait CompletionHandler {
  def complete(code: String, cursor: Int): CompletionResult
}
