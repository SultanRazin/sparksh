name := "spark-tui-backend"
version := "0.1.0"
scalaVersion := "2.13.17"

// Spark 4.0.0 is latest stable (4.1.0 doesn't exist yet - double check yours)
val sparkVersion = "4.0.0"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion % "provided",
  "org.apache.spark" %% "spark-sql"  % sparkVersion % "provided",
  "org.apache.spark" %% "spark-repl" % sparkVersion % "provided"
)

// For JSON protocol with your TUI
libraryDependencies += "com.lihaoyi" %% "ujson" % "4.0.0"

// Fork when running locally (Spark needs this)
fork := true

assembly / assemblyMergeStrategy := {
  case PathList("META-INF", xs @ _*) => MergeStrategy.discard
  case _ => MergeStrategy.first
}