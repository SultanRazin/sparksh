name := "sparksh-backend"
version := "0.1.3"
scalaVersion := "2.13.17"

val sparkVersion = "4.0.0"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion % "provided",
  "org.apache.spark" %% "spark-sql"  % sparkVersion % "provided",
  "org.apache.spark" %% "spark-repl" % sparkVersion % "provided"
)

libraryDependencies += "com.lihaoyi" %% "ujson" % "4.0.0"

fork := true

assembly / assemblyMergeStrategy := {
  case PathList("META-INF", xs @ _*) => MergeStrategy.discard
  case _ => MergeStrategy.first
}