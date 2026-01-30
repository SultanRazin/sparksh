name := "sparksh-backend"
version := "0.1.0"

val sparkVersion = settingKey[String]("Spark version to build against")
sparkVersion := sys.props.getOrElse("spark.version", "3.5.4")

// Spark 3.x uses Scala 2.12, Spark 4.x uses Scala 2.13
scalaVersion := {
  val sparkMajor = sparkVersion.value.split("\\.")(0).toInt
  if (sparkMajor >= 4) "2.13.17" else "2.12.18"
}

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion.value % "provided",
  "org.apache.spark" %% "spark-sql"  % sparkVersion.value % "provided",
  "org.apache.spark" %% "spark-repl" % sparkVersion.value % "provided"
)

libraryDependencies += "com.lihaoyi" %% "ujson" % "4.0.0"

fork := true

// Add version-specific source directory
Compile / unmanagedSourceDirectories += {
  val sparkMajor = sparkVersion.value.split("\\.")(0).toInt
  val suffix = if (sparkMajor >= 4) "scala-4" else "scala-3"
  baseDirectory.value / "src" / "main" / suffix
}

assembly / assemblyJarName := {
  val sv = sparkVersion.value.split("\\.").take(2).mkString("")
  s"sparksh-backend-spark$sv.jar"
}

assembly / assemblyMergeStrategy := {
  case PathList("META-INF", xs @ _*) => MergeStrategy.discard
  case _ => MergeStrategy.first
}
