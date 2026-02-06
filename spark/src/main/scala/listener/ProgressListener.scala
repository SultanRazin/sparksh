package listener

import org.apache.spark.scheduler._
import ujson._

import java.io.PrintStream

class ProgressListener(out: PrintStream) extends SparkListener {
  private var totalTasks: Int = 0
  private var completedTasks: Int = 0
  private var activeTasks: Int = 0
  private var currentStageId: Int = -1
  private var currentStageName: String = ""

  override def onStageSubmitted(event: SparkListenerStageSubmitted): Unit = {
    currentStageId = event.stageInfo.stageId
    currentStageName = event.stageInfo.name
    totalTasks = event.stageInfo.numTasks
    completedTasks = 0
    activeTasks = 0
    sendProgress()
  }

  override def onStageCompleted(event: SparkListenerStageCompleted): Unit = {
    completedTasks = totalTasks
    activeTasks = 0
    sendProgress()
  }

  override def onTaskStart(event: SparkListenerTaskStart): Unit = {
    activeTasks += 1
    sendProgress()
  }

  private def sendProgress(): Unit = {
    out.println(
      write(
        Obj(
          "type" -> "progress",
          "stageId" -> currentStageId,
          "stageName" -> currentStageName,
          "totalTasks" -> totalTasks,
          "completedTasks" -> completedTasks,
          "activeTasks" -> activeTasks
        )
      )
    )
    out.flush()
  }

  override def onTaskEnd(event: SparkListenerTaskEnd): Unit = {
    activeTasks = Math.max(0, activeTasks - 1)
    completedTasks += 1
    sendProgress()
  }
}
