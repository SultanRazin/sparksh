package repl

import ujson.{Obj, write}

import scala.util.Try

object Initializer {

  def sendMetadata(replContext: ReplContext): Unit = {
    val sparkVersion = replContext.spark.version
    val scalaVersion = util.Properties.versionNumberString
    val master = replContext.spark.sparkContext.master

    replContext.replOutput.getBuffer.setLength(0)

    replContext.originalOut.println(
      write(
        Obj(
          "status" -> "ready",
          "sparkVersion" -> sparkVersion,
          "scalaVersion" -> scalaVersion,
          "master" -> master
        )
      )
    )
    replContext.originalOut.flush()
  }

  def sendFunctions(replContext: ReplContext): Unit = {
    Try {
      val functionRegistry = replContext.spark.sessionState.functionRegistry
      val functions = functionRegistry.listFunction()
      val functionsDesc: List[Obj] = functions
        .map(f => {
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
        })
        .toList
      replContext.originalOut.println(
        write(Obj("type" -> "functions", "functions" -> functionsDesc))
      )
      replContext.originalOut.flush()
    }
  }
}
