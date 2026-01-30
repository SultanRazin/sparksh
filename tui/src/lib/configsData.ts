// Auto-generated - do not edit
// Contains embedded Spark configuration documentation
import type { ConfigInfo } from "../types";

export const CONFIGS: ConfigInfo[] = [
  {
    "propertyName": "spark.app.name",
    "defaultValue": "(none)",
    "meaning": "The name of your application. This will appear in the UI and in log data.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.driver.cores",
    "defaultValue": "1",
    "meaning": "Number of cores to use for the driver process, only in cluster mode.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.driver.maxResultSize",
    "defaultValue": "1g",
    "meaning": "Limit of total size of serialized results of all partitions for each Spark action (e.g. collect) in bytes. Should be at least 1M, or 0 for unlimited. Jobs will be aborted if the total size is above this limit. Having a high limit may cause out-of-memory errors in driver (depends on spark.driver.memory and memory overhead of objects in JVM). Setting a proper limit can protect the driver from out-of-memory errors.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.driver.memory",
    "defaultValue": "1g",
    "meaning": "\"Amount of memory to use for the driver process, i.e. where SparkContext is initialized, in the same format as JVM memory strings with a size unit suffix (\"\"k\"\", \"\"m\"\", \"\"g\"\" or \"\"t\"\") (e.g.512m,2g).Note:In client mode, this config must not be set through theSparkConfdirectly in your application, because the driver JVM has already started at that point. Instead, please set this through the--driver-memorycommand line option or in your default properties file.\"",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.driver.memoryOverhead",
    "defaultValue": "driverMemory *spark.driver.memoryOverheadFactor, with minimum ofspark.driver.minMemoryOverhead",
    "meaning": "Amount of non-heap memory to be allocated per driver process in cluster mode, in MiB unless otherwise specified. This is memory that accounts for things like VM overheads, interned strings, other native overheads, etc. This tends to grow with the container size (typically 6-10%). This option is currently supported on YARN and Kubernetes.Note:Non-heap memory includes off-heap memory (whenspark.memory.offHeap.enabled=true) and memory used by other driver processes (e.g. python process that goes with a PySpark driver) and memory used by other non-driver processes running in the same container. The maximum memory size of container to running driver is determined by the sum ofspark.driver.memoryOverheadandspark.driver.memory.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.driver.minMemoryOverhead",
    "defaultValue": "384m",
    "meaning": "The minimum amount of non-heap memory to be allocated per driver process in cluster mode, in MiB unless otherwise specified, ifspark.driver.memoryOverheadis not defined. This option is currently supported on YARN and Kubernetes.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.driver.memoryOverheadFactor",
    "defaultValue": "0.10",
    "meaning": "\"Fraction of driver memory to be allocated as additional non-heap memory per driver process in cluster mode. This is memory that accounts for things like VM overheads, interned strings, other native overheads, etc. This tends to grow with the container size. This value defaults to 0.10 except for Kubernetes non-JVM jobs, which defaults to 0.40. This is done as non-JVM tasks need more non-JVM heap space and such tasks commonly fail with \"\"Memory Overhead Exceeded\"\" errors. This preempts this error with a higher default. This value is ignored ifspark.driver.memoryOverheadis set directly.\"",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.driver.resource.{resourceName}.amount",
    "defaultValue": "0",
    "meaning": "Amount of a particular resource type to use on the driver. If this is used, you must also specify thespark.driver.resource.{resourceName}.discoveryScriptfor the driver to find the resource on startup.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.resource.{resourceName}.discoveryScript",
    "defaultValue": "None",
    "meaning": "A script for the driver to run to discover a particular resource type. This should write to STDOUT a JSON string in the format of the ResourceInformation class. This has a name and an array of addresses. For a client-submitted driver, discovery script must assign different resource addresses to this driver comparing to other drivers on the same host.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.resource.{resourceName}.vendor",
    "defaultValue": "None",
    "meaning": "Vendor of the resources to use for the driver. This option is currently only supported on Kubernetes and is actually both the vendor and domain following the Kubernetes device plugin naming convention. (e.g. For GPUs on Kubernetes this config would be set to nvidia.com or amd.com)",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.resources.discoveryPlugin",
    "defaultValue": "org.apache.spark.resource.ResourceDiscoveryScriptPlugin",
    "meaning": "Comma-separated list of class names implementing org.apache.spark.api.resource.ResourceDiscoveryPlugin to load into the application. This is for advanced users to replace the resource discovery class with a custom implementation. Spark will try each class specified until one of them returns the resource information for that resource. It tries the discovery script last if none of the plugins return information for that resource.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.memory",
    "defaultValue": "1g",
    "meaning": "\"Amount of memory to use per executor process, in the same format as JVM memory strings with a size unit suffix (\"\"k\"\", \"\"m\"\", \"\"g\"\" or \"\"t\"\") (e.g.512m,2g).\"",
    "sinceVersion": "0.7.0"
  },
  {
    "propertyName": "spark.executor.pyspark.memory",
    "defaultValue": "Not set",
    "meaning": "The amount of memory to be allocated to PySpark in each executor, in MiB unless otherwise specified. If set, PySpark memory for an executor will be limited to this amount. If not set, Spark will not limit Python's memory use and it is up to the application to avoid exceeding the overhead memory space shared with other non-JVM processes. When PySpark is run in YARN or Kubernetes, this memory is added to executor resource requests.Note:This feature is dependent on Python'sresourcemodule; therefore, the behaviors and limitations are inherited. For instance, Windows does not support resource limiting and actual resource is not limited on MacOS.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.executor.memoryOverhead",
    "defaultValue": "executorMemory *spark.executor.memoryOverheadFactor, with minimum ofspark.executor.minMemoryOverhead",
    "meaning": "Amount of additional memory to be allocated per executor process, in MiB unless otherwise specified. This is memory that accounts for things like VM overheads, interned strings, other native overheads, etc. This tends to grow with the executor size (typically 6-10%). This option is currently supported on YARN and Kubernetes.Note:Additional memory includes PySpark executor memory (whenspark.executor.pyspark.memoryis not configured) and memory used by other non-executor processes running in the same container. The maximum memory size of container to running executor is determined by the sum ofspark.executor.memoryOverhead,spark.executor.memory,spark.memory.offHeap.sizeandspark.executor.pyspark.memory.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.executor.minMemoryOverhead",
    "defaultValue": "384m",
    "meaning": "The minimum amount of non-heap memory to be allocated per executor process, in MiB unless otherwise specified, ifspark.executor.memoryOverheadis not defined. This option is currently supported on YARN and Kubernetes.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.executor.memoryOverheadFactor",
    "defaultValue": "0.10",
    "meaning": "\"Fraction of executor memory to be allocated as additional non-heap memory per executor process. This is memory that accounts for things like VM overheads, interned strings, other native overheads, etc. This tends to grow with the container size. This value defaults to 0.10 except for Kubernetes non-JVM jobs, which defaults to 0.40. This is done as non-JVM tasks need more non-JVM heap space and such tasks commonly fail with \"\"Memory Overhead Exceeded\"\" errors. This preempts this error with a higher default. This value is ignored ifspark.executor.memoryOverheadis set directly.\"",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.executor.resource.{resourceName}.amount",
    "defaultValue": "0",
    "meaning": "Amount of a particular resource type to use per executor process. If this is used, you must also specify thespark.executor.resource.{resourceName}.discoveryScriptfor the executor to find the resource on startup.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.resource.{resourceName}.discoveryScript",
    "defaultValue": "None",
    "meaning": "A script for the executor to run to discover a particular resource type. This should write to STDOUT a JSON string in the format of the ResourceInformation class. This has a name and an array of addresses.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.resource.{resourceName}.vendor",
    "defaultValue": "None",
    "meaning": "Vendor of the resources to use for the executors. This option is currently only supported on Kubernetes and is actually both the vendor and domain following the Kubernetes device plugin naming convention. (e.g. For GPUs on Kubernetes this config would be set to nvidia.com or amd.com)",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.extraListeners",
    "defaultValue": "(none)",
    "meaning": "A comma-separated list of classes that implementSparkListener; when initializing SparkContext, instances of these classes will be created and registered with Spark's listener bus. If a class has a single-argument constructor that accepts a SparkConf, that constructor will be called; otherwise, a zero-argument constructor will be called. If no valid constructor can be found, the SparkContext creation will fail with an exception.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.local.dir",
    "defaultValue": "/tmp",
    "meaning": "\"Directory to use for \"\"scratch\"\" space in Spark, including map output files and RDDs that get stored on disk. This should be on a fast, local disk in your system. It can also be a comma-separated list of multiple directories on different disks.Note:This will be overridden by SPARK_LOCAL_DIRS (Standalone) or LOCAL_DIRS (YARN) environment variables set by the cluster manager.\"",
    "sinceVersion": "0.5.0"
  },
  {
    "propertyName": "spark.logConf",
    "defaultValue": "false",
    "meaning": "Logs the effective SparkConf as INFO when a SparkContext is started.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.master",
    "defaultValue": "(none)",
    "meaning": "The cluster manager to connect to. See the list ofallowed master URL's.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.submit.deployMode",
    "defaultValue": "client",
    "meaning": "\"The deploy mode of Spark driver program, either \"\"client\"\" or \"\"cluster\"\", Which means to launch driver program locally (\"\"client\"\") or remotely (\"\"cluster\"\") on one of the nodes inside the cluster.\"",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.log.callerContext",
    "defaultValue": "(none)",
    "meaning": "Application information that will be written into Yarn RM log/HDFS audit log when running on Yarn/HDFS. Its length depends on the Hadoop configurationhadoop.caller.context.max.size. It should be concise, and typically can have up to 50 characters.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.log.level",
    "defaultValue": "(none)",
    "meaning": "\"When set, overrides any user-defined log settings as if callingSparkContext.setLogLevel()at Spark startup. Valid log levels include: \"\"ALL\"\", \"\"DEBUG\"\", \"\"ERROR\"\", \"\"FATAL\"\", \"\"INFO\"\", \"\"OFF\"\", \"\"TRACE\"\", \"\"WARN\"\".\"",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.driver.supervise",
    "defaultValue": "false",
    "meaning": "If true, restarts the driver automatically if it fails with a non-zero exit status. Only has effect in Spark standalone mode.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.driver.timeout",
    "defaultValue": "0min",
    "meaning": "A timeout for Spark driver in minutes. 0 means infinite. For the positive time value, terminate the driver with the exit code 124 if it runs after timeout duration. To use, it's required to setspark.pluginswithorg.apache.spark.deploy.DriverTimeoutPlugin.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.driver.log.localDir",
    "defaultValue": "(none)",
    "meaning": "Specifies a local directory to write driver logs and enable Driver Log UI Tab.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.driver.log.dfsDir",
    "defaultValue": "(none)",
    "meaning": "Base directory in which Spark driver logs are synced, ifspark.driver.log.persistToDfs.enabledis true. Within this base directory, each application logs the driver logs to an application specific file. Users may want to set this to a unified location like an HDFS directory so driver log files can be persisted for later usage. This directory should allow any Spark user to read/write files and the Spark History Server user to delete files. Additionally, older logs from this directory are cleaned by theSpark History Serverifspark.history.fs.driverlog.cleaner.enabledis true and, if they are older than max age configured by settingspark.history.fs.driverlog.cleaner.maxAge.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.log.persistToDfs.enabled",
    "defaultValue": "false",
    "meaning": "If true, spark application running in client mode will write driver logs to a persistent storage, configured inspark.driver.log.dfsDir. Ifspark.driver.log.dfsDiris not configured, driver logs will not be persisted. Additionally, enable the cleaner by settingspark.history.fs.driverlog.cleaner.enabledto true inSpark History Server.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.log.layout",
    "defaultValue": "%d{yy/MM/dd HH:mm:ss.SSS} %t %p %c{1}: %m%n%ex",
    "meaning": "The layout for the driver logs that are synced tospark.driver.log.localDirandspark.driver.log.dfsDir. If this is not configured, it uses the layout for the first appender defined in log4j2.properties. If that is also not configured, driver logs use the default layout.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.log.allowErasureCoding",
    "defaultValue": "false",
    "meaning": "Whether to allow driver logs to use erasure coding. On HDFS, erasure coded files will not update as quickly as regular replicated files, so they make take longer to reflect changes written by the application. Note that even if this is true, Spark will still not force the file to use erasure coding, it will simply use file system defaults.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.log.redirectConsoleOutputs",
    "defaultValue": "stdout,stderr",
    "meaning": "Comma-separated list of the console output kind for driver that needs to redirect to logging system. Supported values are `stdout`, `stderr`. It only takes affect when `spark.plugins` is configured with `org.apache.spark.deploy.RedirectConsolePlugin`.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.decommission.enabled",
    "defaultValue": "false",
    "meaning": "When decommission enabled, Spark will try its best to shut down the executor gracefully. Spark will try to migrate all the RDD blocks (controlled byspark.storage.decommission.rddBlocks.enabled) and shuffle blocks (controlled byspark.storage.decommission.shuffleBlocks.enabled) from the decommissioning executor to a remote executor whenspark.storage.decommission.enabledis enabled. With decommission enabled, Spark will also decommission an executor instead of killing whenspark.dynamicAllocation.enabledenabled.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.executor.decommission.killInterval",
    "defaultValue": "(none)",
    "meaning": "Duration after which a decommissioned executor will be killed forcefully by an outside (e.g. non-spark) service.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.executor.decommission.forceKillTimeout",
    "defaultValue": "(none)",
    "meaning": "Duration after which a Spark will force a decommissioning executor to exit. This should be set to a high value in most situations as low values will prevent block migrations from having enough time to complete.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.executor.decommission.signal",
    "defaultValue": "PWR",
    "meaning": "The signal that used to trigger the executor to start decommission.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.executor.maxNumFailures",
    "defaultValue": "numExecutors * 2, with minimum of 3",
    "meaning": "The maximum number of executor failures before failing the application. This configuration only takes effect on YARN and Kubernetes.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.executor.failuresValidityInterval",
    "defaultValue": "(none)",
    "meaning": "Interval after which executor failures will be considered independent and not accumulate towards the attempt count. This configuration only takes effect on YARN and Kubernetes.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.driver.extraClassPath",
    "defaultValue": "(none)",
    "meaning": "Extra classpath entries to prepend to the classpath of the driver.Note:In client mode, this config must not be set through theSparkConfdirectly in your application, because the driver JVM has already started at that point. Instead, please set this through the--driver-class-pathcommand line option or in your default properties file.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.driver.defaultJavaOptions",
    "defaultValue": "(none)",
    "meaning": "A string of default JVM options to prepend tospark.driver.extraJavaOptions. This is intended to be set by administrators. For instance, GC settings or other logging. Note that it is illegal to set maximum heap size (-Xmx) settings with this option. Maximum heap size settings can be set withspark.driver.memoryin the cluster mode and through the--driver-memorycommand line option in the client mode.Note:In client mode, this config must not be set through theSparkConfdirectly in your application, because the driver JVM has already started at that point. Instead, please set this through the--driver-java-optionscommand line option or in your default properties file.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.driver.extraJavaOptions",
    "defaultValue": "(none)",
    "meaning": "A string of extra JVM options to pass to the driver. This is intended to be set by users. For instance, GC settings or other logging. Note that it is illegal to set maximum heap size (-Xmx) settings with this option. Maximum heap size settings can be set withspark.driver.memoryin the cluster mode and through the--driver-memorycommand line option in the client mode.Note:In client mode, this config must not be set through theSparkConfdirectly in your application, because the driver JVM has already started at that point. Instead, please set this through the--driver-java-optionscommand line option or in your default properties file.spark.driver.defaultJavaOptionswill be prepended to this configuration.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.driver.extraLibraryPath",
    "defaultValue": "(none)",
    "meaning": "Set a special library path to use when launching the driver JVM.Note:In client mode, this config must not be set through theSparkConfdirectly in your application, because the driver JVM has already started at that point. Instead, please set this through the--driver-library-pathcommand line option or in your default properties file.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.driver.userClassPathFirst",
    "defaultValue": "false",
    "meaning": "(Experimental) Whether to give user-added jars precedence over Spark's own jars when loading classes in the driver. This feature can be used to mitigate conflicts between Spark's dependencies and user dependencies. It is currently an experimental feature. This is used in cluster mode only.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.executor.extraClassPath",
    "defaultValue": "(none)",
    "meaning": "Extra classpath entries to prepend to the classpath of executors. This exists primarily for backwards-compatibility with older versions of Spark. Users typically should not need to set this option.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.executor.defaultJavaOptions",
    "defaultValue": "(none)",
    "meaning": "A string of default JVM options to prepend tospark.executor.extraJavaOptions. This is intended to be set by administrators. For instance, GC settings or other logging. Note that it is illegal to set Spark properties or maximum heap size (-Xmx) settings with this option. Spark properties should be set using a SparkConf object or the spark-defaults.conf file used with the spark-submit script. Maximum heap size settings can be set with spark.executor.memory. The following symbols, if present will be interpolated: will be replaced by application ID and will be replaced by executor ID. For example, to enable verbose gc logging to a file named for the executor ID of the app in /tmp, pass a 'value' of:-verbose:gc -Xloggc:/tmp/-.gc",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.extraJavaOptions",
    "defaultValue": "(none)",
    "meaning": "A string of extra JVM options to pass to executors. This is intended to be set by users. For instance, GC settings or other logging. Note that it is illegal to set Spark properties or maximum heap size (-Xmx) settings with this option. Spark properties should be set using a SparkConf object or the spark-defaults.conf file used with the spark-submit script. Maximum heap size settings can be set with spark.executor.memory. The following symbols, if present will be interpolated: will be replaced by application ID and will be replaced by executor ID. For example, to enable verbose gc logging to a file named for the executor ID of the app in /tmp, pass a 'value' of:-verbose:gc -Xloggc:/tmp/-.gcspark.executor.defaultJavaOptionswill be prepended to this configuration.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.executor.extraLibraryPath",
    "defaultValue": "(none)",
    "meaning": "Set a special library path to use when launching executor JVM's.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.executor.logs.rolling.maxRetainedFiles",
    "defaultValue": "-1",
    "meaning": "Sets the number of latest rolling log files that are going to be retained by the system. Older log files will be deleted. Disabled by default.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.executor.logs.rolling.enableCompression",
    "defaultValue": "false",
    "meaning": "Enable executor log compression. If it is enabled, the rolled executor logs will be compressed. Disabled by default.",
    "sinceVersion": "2.0.2"
  },
  {
    "propertyName": "spark.executor.logs.rolling.maxSize",
    "defaultValue": "1024 * 1024",
    "meaning": "Set the max size of the file in bytes by which the executor logs will be rolled over. Rolling is disabled by default. Seespark.executor.logs.rolling.maxRetainedFilesfor automatic cleaning of old logs.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.executor.logs.rolling.strategy",
    "defaultValue": "\"\"\"\"\" (disabled)\"",
    "meaning": "\"Set the strategy of rolling of executor logs. By default it is disabled. It can be set to \"\"time\"\" (time-based rolling) or \"\"size\"\" (size-based rolling) or \"\"\"\" (disabled). For \"\"time\"\", usespark.executor.logs.rolling.time.intervalto set the rolling interval. For \"\"size\"\", usespark.executor.logs.rolling.maxSizeto set the maximum file size for rolling.\"",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.executor.logs.rolling.time.interval",
    "defaultValue": "daily",
    "meaning": "Set the time interval by which the executor logs will be rolled over. Rolling is disabled by default. Valid values aredaily,hourly,minutelyor any interval in seconds. Seespark.executor.logs.rolling.maxRetainedFilesfor automatic cleaning of old logs.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.executor.logs.redirectConsoleOutputs",
    "defaultValue": "stdout,stderr",
    "meaning": "Comma-separated list of the console output kind for executor that needs to redirect to logging system. Supported values are `stdout`, `stderr`. It only takes affect when `spark.plugins` is configured with `org.apache.spark.deploy.RedirectConsolePlugin`.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.executor.userClassPathFirst",
    "defaultValue": "false",
    "meaning": "(Experimental) Same functionality asspark.driver.userClassPathFirst, but applied to executor instances.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.executorEnv.[EnvironmentVariableName]",
    "defaultValue": "(none)",
    "meaning": "Add the environment variable specified byEnvironmentVariableNameto the Executor process. The user can specify multiple of these to set multiple environment variables.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.redaction.regex",
    "defaultValue": "\"(?i)secret",
    "meaning": "password",
    "sinceVersion": "token"
  },
  {
    "propertyName": "spark.redaction.string.regex",
    "defaultValue": "(none)",
    "meaning": "Regex to decide which parts of strings produced by Spark contain sensitive information. When this regex matches a string part, that string part is replaced by a dummy value. This is currently used to redact the output of SQL explain commands.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.python.profile",
    "defaultValue": "false",
    "meaning": "Enable profiling in Python worker, the profile result will show up bysc.show_profiles(), or it will be displayed before the driver exits. It also can be dumped into disk bysc.dump_profiles(path). If some of the profile results had been displayed manually, they will not be displayed automatically before driver exiting. By default thepyspark.profiler.BasicProfilerwill be used, but this can be overridden by passing a profiler class in as a parameter to theSparkContextconstructor.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.python.profile.dump",
    "defaultValue": "(none)",
    "meaning": "The directory which is used to dump the profile result before driver exiting. The results will be dumped as separated file for each RDD. They can be loaded bypstats.Stats(). If this is specified, the profile result will not be displayed automatically.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.python.worker.memory",
    "defaultValue": "512m",
    "meaning": "\"Amount of memory to use per python worker process during aggregation, in the same format as JVM memory strings with a size unit suffix (\"\"k\"\", \"\"m\"\", \"\"g\"\" or \"\"t\"\") (e.g.512m,2g). If the memory used during aggregation goes above this amount, it will spill the data into disks.\"",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.python.worker.reuse",
    "defaultValue": "true",
    "meaning": "Reuse Python worker or not. If yes, it will use a fixed number of Python workers, does not need to fork() a Python process for every task. It will be very useful if there is a large broadcast, then the broadcast will not need to be transferred from JVM to Python worker for every task.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.python.factory.idleWorkerMaxPoolSize",
    "defaultValue": "(none)",
    "meaning": "Maximum number of idle Python workers to keep. If unset, the number is unbounded. If set to a positive integer N, at most N idle workers are retained; least-recently used workers are evicted first.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.python.worker.killOnIdleTimeout",
    "defaultValue": "false",
    "meaning": "Whether Spark should terminate the Python worker process when the idle timeout (as defined byspark.python.worker.idleTimeoutSeconds) is reached. If enabled, Spark will terminate the Python worker process in addition to logging the status.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.python.worker.tracebackDumpIntervalSeconds",
    "defaultValue": "0",
    "meaning": "The interval (in seconds) for Python workers to dump their tracebacks. If it's positive, the Python worker will periodically dump the traceback into its `stderr`. The default is `0` that means it is disabled.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.python.unix.domain.socket.enabled",
    "defaultValue": "false",
    "meaning": "When set to true, the Python driver uses a Unix domain socket for operations like creating or collecting a DataFrame from local data, using accumulators, and executing Python functions with PySpark such as Python UDFs. This configuration only applies to Spark Classic and Spark Connect server.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.files",
    "defaultValue": "",
    "meaning": "Comma-separated list of files to be placed in the working directory of each executor. Globs are allowed.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.submit.pyFiles",
    "defaultValue": "",
    "meaning": "Comma-separated list of .zip, .egg, or .py files to place on the PYTHONPATH for Python apps. Globs are allowed.",
    "sinceVersion": "1.0.1"
  },
  {
    "propertyName": "spark.submit.callSystemExitOnMainExit",
    "defaultValue": "false",
    "meaning": "If true, SparkSubmit will call System.exit() to initiate JVM shutdown once the user's main method has exited. This can be useful in cases where non-daemon JVM threads might otherwise prevent the JVM from shutting down on its own.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.jars",
    "defaultValue": "",
    "meaning": "Comma-separated list of jars to include on the driver and executor classpaths. Globs are allowed.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.jars.packages",
    "defaultValue": "",
    "meaning": "Comma-separated list of Maven coordinates of jars to include on the driver and executor classpaths. The coordinates should be groupId:artifactId:version. Ifspark.jars.ivySettingsis given artifacts will be resolved according to the configuration in the file, otherwise artifacts will be searched for in the local maven repo, then maven central and finally any additional remote repositories given by the command-line option--repositories. For more details, seeAdvanced Dependency Management.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.jars.excludes",
    "defaultValue": "",
    "meaning": "Comma-separated list of groupId:artifactId, to exclude while resolving the dependencies provided inspark.jars.packagesto avoid dependency conflicts.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.jars.ivy",
    "defaultValue": "",
    "meaning": "Path to specify the Ivy user directory, used for the local Ivy cache and package files fromspark.jars.packages. This will override the Ivy propertyivy.default.ivy.user.dirwhich defaults to ~/.ivy2.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.jars.ivySettings",
    "defaultValue": "",
    "meaning": "Path to an Ivy settings file to customize resolution of jars specified usingspark.jars.packagesinstead of the built-in defaults, such as maven central. Additional repositories given by the command-line option--repositoriesorspark.jars.repositorieswill also be included. Useful for allowing Spark to resolve artifacts from behind a firewall e.g. via an in-house artifact server like Artifactory. Details on the settings file format can be found atSettings Files. Only paths withfile://scheme are supported. Paths without a scheme are assumed to have afile://scheme.When running in YARN cluster mode, this file will also be localized to the remote driver for dependency resolution withinSparkContext#addJar",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.jars.repositories",
    "defaultValue": "",
    "meaning": "Comma-separated list of additional remote repositories to search for the maven coordinates given with--packagesorspark.jars.packages.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.archives",
    "defaultValue": "",
    "meaning": "Comma-separated list of archives to be extracted into the working directory of each executor. .jar, .tar.gz, .tgz and .zip are supported. You can specify the directory name to unpack via adding#after the file name to unpack, for example,file.zip#directory. This configuration is experimental.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.pyspark.driver.python",
    "defaultValue": "",
    "meaning": "Python binary executable to use for PySpark in driver. (default isspark.pyspark.python)",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.pyspark.python",
    "defaultValue": "",
    "meaning": "Python binary executable to use for PySpark in both driver and executors.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.reducer.maxSizeInFlight",
    "defaultValue": "48m",
    "meaning": "Maximum size of map outputs to fetch simultaneously from each reduce task, in MiB unless otherwise specified. Since each output requires us to create a buffer to receive it, this represents a fixed memory overhead per reduce task, so keep it small unless you have a large amount of memory.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.reducer.maxReqsInFlight",
    "defaultValue": "Int.MaxValue",
    "meaning": "This configuration limits the number of remote requests to fetch blocks at any given point. When the number of hosts in the cluster increase, it might lead to very large number of inbound connections to one or more nodes, causing the workers to fail under load. By allowing it to limit the number of fetch requests, this scenario can be mitigated.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.reducer.maxBlocksInFlightPerAddress",
    "defaultValue": "Int.MaxValue",
    "meaning": "This configuration limits the number of remote blocks being fetched per reduce task from a given host port. When a large number of blocks are being requested from a given address in a single fetch or simultaneously, this could crash the serving executor or Node Manager. This is especially useful to reduce the load on the Node Manager when external shuffle is enabled. You can mitigate this issue by setting it to a lower value.",
    "sinceVersion": "2.2.1"
  },
  {
    "propertyName": "spark.shuffle.compress",
    "defaultValue": "true",
    "meaning": "Whether to compress map output files. Generally a good idea. Compression will usespark.io.compression.codec.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.shuffle.file.buffer",
    "defaultValue": "32k",
    "meaning": "Size of the in-memory buffer for each shuffle file output stream, in KiB unless otherwise specified. These buffers reduce the number of disk seeks and system calls made in creating intermediate shuffle files.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.shuffle.file.merge.buffer",
    "defaultValue": "32k",
    "meaning": "Size of the in-memory buffer for each shuffle file input stream, in KiB unless otherwise specified. These buffers use off-heap buffers and are related to the number of files in the shuffle file. Too large buffers should be avoided.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.shuffle.unsafe.file.output.buffer",
    "defaultValue": "32k",
    "meaning": "Deprecated since Spark 4.0, please usespark.shuffle.localDisk.file.output.buffer.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.shuffle.localDisk.file.output.buffer",
    "defaultValue": "32k",
    "meaning": "The file system for this buffer size after each partition is written in all local disk shuffle writers. In KiB unless otherwise specified.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.shuffle.spill.diskWriteBufferSize",
    "defaultValue": "1024 * 1024",
    "meaning": "The buffer size, in bytes, to use when writing the sorted records to an on-disk file.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.shuffle.io.maxRetries",
    "defaultValue": "3",
    "meaning": "(Netty only) Fetches that fail due to IO-related exceptions are automatically retried if this is set to a non-zero value. This retry logic helps stabilize large shuffles in the face of long GC pauses or transient network connectivity issues.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.shuffle.io.numConnectionsPerPeer",
    "defaultValue": "1",
    "meaning": "(Netty only) Connections between hosts are reused in order to reduce connection buildup for large clusters. For clusters with many hard disks and few hosts, this may result in insufficient concurrency to saturate all disks, and so users may consider increasing this value.",
    "sinceVersion": "1.2.1"
  },
  {
    "propertyName": "spark.shuffle.io.preferDirectBufs",
    "defaultValue": "true",
    "meaning": "(Netty only) Off-heap buffers are used to reduce garbage collection during shuffle and cache block transfer. For environments where off-heap memory is tightly limited, users may wish to turn this off to force all allocations from Netty to be on-heap.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.shuffle.io.retryWait",
    "defaultValue": "5s",
    "meaning": "(Netty only) How long to wait between retries of fetches. The maximum delay caused by retrying is 15 seconds by default, calculated asmaxRetries * retryWait.",
    "sinceVersion": "1.2.1"
  },
  {
    "propertyName": "spark.shuffle.io.backLog",
    "defaultValue": "-1",
    "meaning": "Length of the accept queue for the shuffle service. For large applications, this value may need to be increased, so that incoming connections are not dropped if the service cannot keep up with a large number of connections arriving in a short period of time. This needs to be configured wherever the shuffle service itself is running, which may be outside of the application (seespark.shuffle.service.enabledoption below). If set below 1, will fallback to OS default defined by Netty'sio.netty.util.NetUtil#SOMAXCONN.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.shuffle.io.connectionTimeout",
    "defaultValue": "value ofspark.network.timeout",
    "meaning": "Timeout for the established connections between shuffle servers and clients to be marked as idled and closed if there are still outstanding fetch requests but no traffic no the channel for at leastconnectionTimeout.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.shuffle.io.connectionCreationTimeout",
    "defaultValue": "value ofspark.shuffle.io.connectionTimeout",
    "meaning": "Timeout for establishing a connection between the shuffle servers and clients.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.service.enabled",
    "defaultValue": "false",
    "meaning": "Enables the external shuffle service. This service preserves the shuffle files written by executors e.g. so that executors can be safely removed, or so that shuffle fetches can continue in the event of executor failure. The external shuffle service must be set up in order to enable it. Seedynamic allocation configuration and setup documentationfor more information.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.shuffle.service.port",
    "defaultValue": "7337",
    "meaning": "Port on which the external shuffle service will run.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.shuffle.service.name",
    "defaultValue": "spark_shuffle",
    "meaning": "The configured name of the Spark shuffle service the client should communicate with. This must match the name used to configure the Shuffle within the YARN NodeManager configuration (yarn.nodemanager.aux-services). Only takes effect whenspark.shuffle.service.enabledis set to true.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.service.index.cache.size",
    "defaultValue": "100m",
    "meaning": "Cache entries limited to the specified memory footprint, in bytes unless otherwise specified.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.shuffle.service.removeShuffle",
    "defaultValue": "true",
    "meaning": "Whether to use the ExternalShuffleService for deleting shuffle blocks for deallocated executors when the shuffle is no longer needed. Without this enabled, shuffle data on executors that are deallocated will remain on disk until the application ends.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.shuffle.maxChunksBeingTransferred",
    "defaultValue": "Long.MAX_VALUE",
    "meaning": "The max number of chunks allowed to be transferred at the same time on shuffle service. Note that new incoming connections will be closed when the max number is hit. The client will retry according to the shuffle retry configs (seespark.shuffle.io.maxRetriesandspark.shuffle.io.retryWait), if those limits are reached the task will fail with fetch failure.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.shuffle.sort.bypassMergeThreshold",
    "defaultValue": "200",
    "meaning": "(Advanced) In the sort-based shuffle manager, avoid merge-sorting data if there is no map-side aggregation and there are at most this many reduce partitions.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.shuffle.sort.io.plugin.class",
    "defaultValue": "org.apache.spark.shuffle.sort.io.LocalDiskShuffleDataIO",
    "meaning": "Name of the class to use for shuffle IO.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.shuffle.spill.compress",
    "defaultValue": "true",
    "meaning": "Whether to compress data spilled during shuffles. Compression will usespark.io.compression.codec.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.shuffle.accurateBlockThreshold",
    "defaultValue": "100 * 1024 * 1024",
    "meaning": "Threshold in bytes above which the size of shuffle blocks in HighlyCompressedMapStatus is accurately recorded. This helps to prevent OOM by avoiding underestimating shuffle block size when fetch shuffle blocks.",
    "sinceVersion": "2.2.1"
  },
  {
    "propertyName": "spark.shuffle.accurateBlockSkewedFactor",
    "defaultValue": "-1.0",
    "meaning": "A shuffle block is considered as skewed and will be accurately recorded inHighlyCompressedMapStatusif its size is larger than this factor multiplying the median shuffle block size orspark.shuffle.accurateBlockThreshold. It is recommended to set this parameter to be the same asspark.sql.adaptive.skewJoin.skewedPartitionFactor. Set to -1.0 to disable this feature by default.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.shuffle.registration.timeout",
    "defaultValue": "5000",
    "meaning": "Timeout in milliseconds for registration to the external shuffle service.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.shuffle.registration.maxAttempts",
    "defaultValue": "3",
    "meaning": "When we fail to register to the external shuffle service, we will retry for maxAttempts times.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.shuffle.reduceLocality.enabled",
    "defaultValue": "true",
    "meaning": "Whether to compute locality preferences for reduce tasks.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.shuffle.mapOutput.minSizeForBroadcast",
    "defaultValue": "512k",
    "meaning": "The size at which we use Broadcast to send the map output statuses to the executors.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.shuffle.detectCorrupt",
    "defaultValue": "true",
    "meaning": "Whether to detect any corruption in fetched blocks.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.shuffle.detectCorrupt.useExtraMemory",
    "defaultValue": "false",
    "meaning": "If enabled, part of a compressed/encrypted stream will be de-compressed/de-crypted by using extra memory to detect early corruption. Any IOException thrown will cause the task to be retried once and if it fails again with same exception, then FetchFailedException will be thrown to retry previous stage.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.shuffle.useOldFetchProtocol",
    "defaultValue": "false",
    "meaning": "Whether to use the old protocol while doing the shuffle block fetching. It is only enabled while we need the compatibility in the scenario of new Spark version job fetching shuffle blocks from old version external shuffle service.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.shuffle.readHostLocalDisk",
    "defaultValue": "true",
    "meaning": "If enabled (andspark.shuffle.useOldFetchProtocolis disabled, shuffle blocks requested from those block managers which are running on the same host are read from the disk directly instead of being fetched as remote blocks over the network.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.files.io.connectionTimeout",
    "defaultValue": "value ofspark.network.timeout",
    "meaning": "Timeout for the established connections for fetching files in Spark RPC environments to be marked as idled and closed if there are still outstanding files being downloaded but no traffic no the channel for at leastconnectionTimeout.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.files.io.connectionCreationTimeout",
    "defaultValue": "value ofspark.files.io.connectionTimeout",
    "meaning": "Timeout for establishing a connection for fetching files in Spark RPC environments.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.checksum.enabled",
    "defaultValue": "true",
    "meaning": "Whether to calculate the checksum of shuffle data. If enabled, Spark will calculate the checksum values for each partition data within the map output file and store the values in a checksum file on the disk. When there's shuffle data corruption detected, Spark will try to diagnose the cause (e.g., network issue, disk issue, etc.) of the corruption by using the checksum file.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.checksum.algorithm",
    "defaultValue": "ADLER32",
    "meaning": "The algorithm is used to calculate the shuffle checksum. Currently, it only supports built-in algorithms of JDK, e.g., ADLER32, CRC32 and CRC32C.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.service.fetch.rdd.enabled",
    "defaultValue": "false",
    "meaning": "Whether to use the ExternalShuffleService for fetching disk persisted RDD blocks. In case of dynamic allocation if this feature is enabled executors having only disk persisted blocks are considered idle afterspark.dynamicAllocation.executorIdleTimeoutand will be released accordingly.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.shuffle.service.db.enabled",
    "defaultValue": "true",
    "meaning": "Whether to use db in ExternalShuffleService. Note that this only affects standalone mode.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.shuffle.service.db.backend",
    "defaultValue": "ROCKSDB",
    "meaning": "Specifies a disk-based store used in shuffle service local db. Setting as ROCKSDB or LEVELDB (deprecated).",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.eventLog.logBlockUpdates.enabled",
    "defaultValue": "false",
    "meaning": "Whether to log events for every block update, ifspark.eventLog.enabledis true. *Warning*: This will increase the size of the event log considerably.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.eventLog.longForm.enabled",
    "defaultValue": "false",
    "meaning": "If true, use the long form of call sites in the event log. Otherwise use the short form.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.eventLog.compress",
    "defaultValue": "true",
    "meaning": "Whether to compress logged events, ifspark.eventLog.enabledis true.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.eventLog.compression.codec",
    "defaultValue": "zstd",
    "meaning": "The codec to compress logged events. By default, Spark provides four codecs:lz4,lzf,snappy, andzstd. You can also use fully qualified class names to specify the codec, e.g.org.apache.spark.io.LZ4CompressionCodec,org.apache.spark.io.LZFCompressionCodec,org.apache.spark.io.SnappyCompressionCodec, andorg.apache.spark.io.ZStdCompressionCodec.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.eventLog.erasureCoding.enabled",
    "defaultValue": "false",
    "meaning": "Whether to allow event logs to use erasure coding, or turn erasure coding off, regardless of filesystem defaults. On HDFS, erasure coded files will not update as quickly as regular replicated files, so the application updates will take longer to appear in the History Server. Note that even if this is true, Spark will still not force the file to use erasure coding, it will simply use filesystem defaults.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.eventLog.excludedPatterns",
    "defaultValue": "(none)",
    "meaning": "Specifies comma-separated event names to be excluded from the event logs.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.eventLog.dir",
    "defaultValue": "file:///tmp/spark-events",
    "meaning": "Base directory in which Spark events are logged, ifspark.eventLog.enabledis true. Within this base directory, Spark creates a sub-directory for each application, and logs the events specific to the application in this directory. Users may want to set this to a unified location like an HDFS directory so history files can be read by the history server.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.eventLog.enabled",
    "defaultValue": "false",
    "meaning": "Whether to log Spark events, useful for reconstructing the Web UI after the application has finished.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.eventLog.overwrite",
    "defaultValue": "false",
    "meaning": "Whether to overwrite any existing files.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.eventLog.buffer.kb",
    "defaultValue": "100k",
    "meaning": "Buffer size to use when writing to output streams, in KiB unless otherwise specified.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.eventLog.rolling.enabled",
    "defaultValue": "true",
    "meaning": "Whether rolling over event log files is enabled. If set to true, it cuts down each event log file to the configured size.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.eventLog.rolling.maxFileSize",
    "defaultValue": "128m",
    "meaning": "Whenspark.eventLog.rolling.enabled=true, specifies the max size of event log file before it's rolled over.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.ui.dagGraph.retainedRootRDDs",
    "defaultValue": "Int.MaxValue",
    "meaning": "How many DAG graph nodes the Spark UI and status APIs remember before garbage collecting.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.ui.groupSQLSubExecutionEnabled",
    "defaultValue": "true",
    "meaning": "Whether to group sub executions together in SQL UI when they belong to the same root execution",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.ui.enabled",
    "defaultValue": "true",
    "meaning": "Whether to run the web UI for the Spark application.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.ui.store.path",
    "defaultValue": "None",
    "meaning": "Local directory where to cache application information for live UI. By default this is not set, meaning all application information will be kept in memory.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.ui.killEnabled",
    "defaultValue": "true",
    "meaning": "Allows jobs and stages to be killed from the web UI.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.ui.threadDumpsEnabled",
    "defaultValue": "true",
    "meaning": "Whether to show a link for executor thread dumps in Stages and Executor pages.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.ui.threadDump.flamegraphEnabled",
    "defaultValue": "true",
    "meaning": "Whether to render the Flamegraph for executor thread dumps.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.ui.heapHistogramEnabled",
    "defaultValue": "true",
    "meaning": "Whether to show a link for executor heap histogram in Executor page.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.ui.liveUpdate.period",
    "defaultValue": "100ms",
    "meaning": "\"How often to update live entities. -1 means \"\"never update\"\" when replaying applications, meaning only the last write will happen. For live applications, this avoids a few operations that we can live without when rapidly processing incoming task events.\"",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.ui.liveUpdate.minFlushPeriod",
    "defaultValue": "1s",
    "meaning": "Minimum time elapsed before stale UI data is flushed. This avoids UI staleness when incoming task events are not fired frequently.",
    "sinceVersion": "2.4.2"
  },
  {
    "propertyName": "spark.ui.port",
    "defaultValue": "4040",
    "meaning": "Port for your application's dashboard, which shows memory and workload data.",
    "sinceVersion": "0.7.0"
  },
  {
    "propertyName": "spark.ui.retainedJobs",
    "defaultValue": "1000",
    "meaning": "How many jobs the Spark UI and status APIs remember before garbage collecting. This is a target maximum, and fewer elements may be retained in some circumstances.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.ui.retainedStages",
    "defaultValue": "1000",
    "meaning": "How many stages the Spark UI and status APIs remember before garbage collecting. This is a target maximum, and fewer elements may be retained in some circumstances.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.ui.retainedTasks",
    "defaultValue": "100000",
    "meaning": "How many tasks in one stage the Spark UI and status APIs remember before garbage collecting. This is a target maximum, and fewer elements may be retained in some circumstances.",
    "sinceVersion": "2.0.1"
  },
  {
    "propertyName": "spark.ui.reverseProxy",
    "defaultValue": "false",
    "meaning": "Enable running Spark Master as reverse proxy for worker and application UIs. In this mode, Spark master will reverse proxy the worker and application UIs to enable access without requiring direct access to their hosts. Use it with caution, as worker and application UI will not be accessible directly, you will only be able to access them through spark master/proxy public URL. This setting affects all the workers and application UIs running in the cluster and must be set on all the workers, drivers and masters.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.ui.reverseProxyUrl",
    "defaultValue": "",
    "meaning": "\"If the Spark UI should be served through another front-end reverse proxy, this is the URL for accessing the Spark master UI through that reverse proxy. This is useful when running proxy for authentication e.g. an OAuth proxy. The URL may contain a path prefix, likehttp://mydomain.com/path/to/spark/, allowing you to serve the UI for multiple Spark clusters and other web applications through the same virtual host and port. Normally, this should be an absolute URL including scheme (http/https), host and port. It is possible to specify a relative URL starting with \"\"/\"\" here. In this case, all URLs generated by the Spark UI and Spark REST APIs will be server-relative links -- this will still work, as the entire Spark UI is served through the same host and port.The setting affects link generation in the Spark UI, but the front-end reverse proxy is responsible forstripping a path prefix before forwarding the request,rewriting redirects which point directly to the Spark master,redirecting access fromhttp://mydomain.com/path/to/sparktohttp://mydomain.com/path/to/spark/(trailing slash after path prefix); otherwise relative links on the master page do not work correctly.This setting affects all the workers and application UIs running in the cluster and must be set identically on all the workers, drivers and masters. In is only effective whenspark.ui.reverseProxyis turned on. This setting is not needed when the Spark master web UI is directly reachable.Note that the value of the setting can't contain the keywordproxyorhistoryafter split by \"\"/\"\". Spark UI relies on both keywords for getting REST API endpoints from URIs.\"",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.ui.proxyRedirectUri",
    "defaultValue": "",
    "meaning": "Where to address redirects when Spark is running behind a proxy. This will make Spark modify redirect responses so they point to the proxy server, instead of the Spark UI's own address. This should be only the address of the server, without any prefix paths for the application; the prefix should be set either by the proxy server itself (by adding theX-Forwarded-Contextrequest header), or by setting the proxy base in the Spark app's configuration.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.ui.showConsoleProgress",
    "defaultValue": "false",
    "meaning": "Show the progress bar in the console. The progress bar shows the progress of stages that run for longer than 500ms. If multiple stages run at the same time, multiple progress bars will be displayed on the same line.Note:In shell environment, the default value of spark.ui.showConsoleProgress is true.",
    "sinceVersion": "1.2.1"
  },
  {
    "propertyName": "spark.ui.consoleProgress.update.interval",
    "defaultValue": "200",
    "meaning": "An interval in milliseconds to update the progress bar in the console.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.ui.custom.executor.log.url",
    "defaultValue": "(none)",
    "meaning": "Specifies custom spark executor log URL for supporting external log service instead of using cluster managers' application log URLs in Spark UI. Spark will support some path variables via patterns which can vary on cluster manager. Please check the documentation for your cluster manager to see which patterns are supported, if any.Please note that this configuration also replaces original log urls in event log, which will be also effective when accessing the application on history server. The new log urls must be permanent, otherwise you might have dead link for executor log urls.For now, only YARN and K8s cluster manager supports this configuration",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.ui.prometheus.enabled",
    "defaultValue": "true",
    "meaning": "Expose executor metrics at /metrics/executors/prometheus at driver web page.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.worker.ui.retainedExecutors",
    "defaultValue": "1000",
    "meaning": "How many finished executors the Spark UI and status APIs remember before garbage collecting.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.worker.ui.retainedDrivers",
    "defaultValue": "1000",
    "meaning": "How many finished drivers the Spark UI and status APIs remember before garbage collecting.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.ui.retainedExecutions",
    "defaultValue": "1000",
    "meaning": "How many finished executions the Spark UI and status APIs remember before garbage collecting.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.streaming.ui.retainedBatches",
    "defaultValue": "1000",
    "meaning": "How many finished batches the Spark UI and status APIs remember before garbage collecting.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.ui.retainedDeadExecutors",
    "defaultValue": "100",
    "meaning": "How many dead executors the Spark UI and status APIs remember before garbage collecting.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.ui.filters",
    "defaultValue": "None",
    "meaning": "Comma separated list of filter class names to apply to the Spark Web UI. The filter should be a standardjavax servlet Filter.Filter parameters can also be specified in the configuration, by setting config entries of the formspark.<class name of filter>.param.<param name>=<value>For example:spark.ui.filters=com.test.filter1spark.com.test.filter1.param.name1=foospark.com.test.filter1.param.name2=bar",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.ui.requestHeaderSize",
    "defaultValue": "8k",
    "meaning": "The maximum allowed size for a HTTP request header, in bytes unless otherwise specified. This setting applies for the Spark History Server too.",
    "sinceVersion": "2.2.3"
  },
  {
    "propertyName": "spark.ui.timelineEnabled",
    "defaultValue": "true",
    "meaning": "Whether to display event timeline data on UI pages.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.ui.timeline.executors.maximum",
    "defaultValue": "250",
    "meaning": "The maximum number of executors shown in the event timeline.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.ui.timeline.jobs.maximum",
    "defaultValue": "500",
    "meaning": "The maximum number of jobs shown in the event timeline.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.ui.timeline.stages.maximum",
    "defaultValue": "500",
    "meaning": "The maximum number of stages shown in the event timeline.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.ui.timeline.tasks.maximum",
    "defaultValue": "1000",
    "meaning": "The maximum number of tasks shown in the event timeline.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.broadcast.compress",
    "defaultValue": "true",
    "meaning": "Whether to compress broadcast variables before sending them. Generally a good idea. Compression will usespark.io.compression.codec.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.checkpoint.dir",
    "defaultValue": "(none)",
    "meaning": "Set the default directory for checkpointing. It can be overwritten by SparkContext.setCheckpointDir.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.checkpoint.compress",
    "defaultValue": "true",
    "meaning": "Whether to compress RDD checkpoints. Generally a good idea. Compression will usespark.io.compression.codec.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.io.compression.codec",
    "defaultValue": "lz4",
    "meaning": "The codec used to compress internal data such as RDD partitions, event log, broadcast variables and shuffle outputs. By default, Spark provides four codecs:lz4,lzf,snappy, andzstd. You can also use fully qualified class names to specify the codec, e.g.org.apache.spark.io.LZ4CompressionCodec,org.apache.spark.io.LZFCompressionCodec,org.apache.spark.io.SnappyCompressionCodec, andorg.apache.spark.io.ZStdCompressionCodec.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.io.compression.lz4.blockSize",
    "defaultValue": "32k",
    "meaning": "Block size used in LZ4 compression, in the case when LZ4 compression codec is used. Lowering this block size will also lower shuffle memory usage when LZ4 is used. Default unit is bytes, unless otherwise specified. This configuration only applies tospark.io.compression.codec.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.io.compression.snappy.blockSize",
    "defaultValue": "32k",
    "meaning": "Block size in Snappy compression, in the case when Snappy compression codec is used. Lowering this block size will also lower shuffle memory usage when Snappy is used. Default unit is bytes, unless otherwise specified. This configuration only applies tospark.io.compression.codec.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.io.compression.zstd.level",
    "defaultValue": "1",
    "meaning": "Compression level for Zstd compression codec. Increasing the compression level will result in better compression at the expense of more CPU and memory. This configuration only applies tospark.io.compression.codec.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.io.compression.zstd.bufferSize",
    "defaultValue": "32k",
    "meaning": "Buffer size in bytes used in Zstd compression, in the case when Zstd compression codec is used. Lowering this size will lower the shuffle memory usage when Zstd is used, but it might increase the compression cost because of excessive JNI call overhead. This configuration only applies tospark.io.compression.codec.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.io.compression.zstd.bufferPool.enabled",
    "defaultValue": "true",
    "meaning": "If true, enable buffer pool of ZSTD JNI library.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.io.compression.zstd.strategy",
    "defaultValue": "(none)",
    "meaning": "Compression strategy for Zstd compression codec. The higher the value is, the more complex it becomes, usually resulting stronger but slower compression or higher CPU cost.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.io.compression.zstd.workers",
    "defaultValue": "0",
    "meaning": "Thread size spawned to compress in parallel when using Zstd. When value is 0 no worker is spawned, it works in single-threaded mode. When value > 0, it triggers asynchronous mode, corresponding number of threads are spawned. More workers improve performance, but also increase memory cost.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.io.compression.lzf.parallel.enabled",
    "defaultValue": "true",
    "meaning": "When true, LZF compression will use multiple threads to compress data in parallel.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.kryo.classesToRegister",
    "defaultValue": "(none)",
    "meaning": "If you use Kryo serialization, give a comma-separated list of custom class names to register with Kryo. See thetuning guidefor more details.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.kryo.referenceTracking",
    "defaultValue": "true",
    "meaning": "Whether to track references to the same object when serializing data with Kryo, which is necessary if your object graphs have loops and useful for efficiency if they contain multiple copies of the same object. Can be disabled to improve performance if you know this is not the case.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.kryo.registrationRequired",
    "defaultValue": "false",
    "meaning": "Whether to require registration with Kryo. If set to 'true', Kryo will throw an exception if an unregistered class is serialized. If set to false (the default), Kryo will write unregistered class names along with each object. Writing class names can cause significant performance overhead, so enabling this option can enforce strictly that a user has not omitted classes from registration.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.kryo.registrator",
    "defaultValue": "(none)",
    "meaning": "If you use Kryo serialization, give a comma-separated list of classes that register your custom classes with Kryo. This property is useful if you need to register your classes in a custom way, e.g. to specify a custom field serializer. Otherwisespark.kryo.classesToRegisteris simpler. It should be set to classes that extendKryoRegistrator. See thetuning guidefor more details.",
    "sinceVersion": "0.5.0"
  },
  {
    "propertyName": "spark.kryo.unsafe",
    "defaultValue": "true",
    "meaning": "Whether to use unsafe based Kryo serializer. Can be substantially faster by using Unsafe Based IO.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.kryoserializer.buffer.max",
    "defaultValue": "64m",
    "meaning": "\"Maximum allowable size of Kryo serialization buffer, in MiB unless otherwise specified. This must be larger than any object you attempt to serialize and must be less than 2048m. Increase this if you get a \"\"buffer limit exceeded\"\" exception inside Kryo.\"",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.kryoserializer.buffer",
    "defaultValue": "64k",
    "meaning": "Initial size of Kryo's serialization buffer, in KiB unless otherwise specified. Note that there will be one bufferper coreon each worker. This buffer will grow up tospark.kryoserializer.buffer.maxif needed.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.rdd.compress",
    "defaultValue": "false",
    "meaning": "Whether to compress serialized RDD partitions (e.g. forStorageLevel.MEMORY_ONLY_SERin Java and Scala orStorageLevel.MEMORY_ONLYin Python). Can save substantial space at the cost of some extra CPU time. Compression will usespark.io.compression.codec.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.serializer",
    "defaultValue": "org.apache.spark.serializer.JavaSerializer",
    "meaning": "Class to use for serializing objects that will be sent over the network or need to be cached in serialized form. The default of Java serialization works with any Serializable Java object but is quite slow, so we recommendusingorg.apache.spark.serializer.KryoSerializerand configuring Kryo serializationwhen speed is necessary. Can be any subclass oforg.apache.spark.Serializer.",
    "sinceVersion": "0.5.0"
  },
  {
    "propertyName": "spark.serializer.objectStreamReset",
    "defaultValue": "100",
    "meaning": "When serializing using org.apache.spark.serializer.JavaSerializer, the serializer caches objects to prevent writing redundant data, however that stops garbage collection of those objects. By calling 'reset' you flush that info from the serializer, and allow old objects to be collected. To turn off this periodic reset set it to -1. By default it will reset the serializer every 100 objects.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.memory.fraction",
    "defaultValue": "0.6",
    "meaning": "Fraction of (heap space - 300MB) used for execution and storage. The lower this is, the more frequently spills and cached data eviction occur. The purpose of this config is to set aside memory for internal metadata, user data structures, and imprecise size estimation in the case of sparse, unusually large records. Leaving this at the default value is recommended. For more detail, including important information about correctly tuning JVM garbage collection when increasing this value, seethis description.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.memory.storageFraction",
    "defaultValue": "0.5",
    "meaning": "Amount of storage memory immune to eviction, expressed as a fraction of the size of the region set aside byspark.memory.fraction. The higher this is, the less working memory may be available to execution and tasks may spill to disk more often. Leaving this at the default value is recommended. For more detail, seethis description.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.memory.offHeap.enabled",
    "defaultValue": "false",
    "meaning": "If true, Spark will attempt to use off-heap memory for certain operations. If off-heap memory use is enabled, thenspark.memory.offHeap.sizemust be positive.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.memory.offHeap.size",
    "defaultValue": "0",
    "meaning": "The absolute amount of memory which can be used for off-heap allocation, in bytes unless otherwise specified. This setting has no impact on heap memory usage, so if your executors' total memory consumption must fit within some hard limit then be sure to shrink your JVM heap size accordingly. This must be set to a positive value whenspark.memory.offHeap.enabled=true.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.memory.unmanagedMemoryPollingInterval",
    "defaultValue": "0s",
    "meaning": "Interval for polling unmanaged memory users to track their memory usage. Unmanaged memory users are components that manage their own memory outside of Spark's core memory management, such as RocksDB for Streaming State Store. Setting this to 0 disables unmanaged memory polling.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.storage.unrollMemoryThreshold",
    "defaultValue": "1024 * 1024",
    "meaning": "Initial memory to request before unrolling any block.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.storage.replication.proactive",
    "defaultValue": "true",
    "meaning": "Enables proactive block replication for RDD blocks. Cached RDD block replicas lost due to executor failures are replenished if there are any existing available replicas. This tries to get the replication level of the block to the initial number.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.storage.localDiskByExecutors.cacheSize",
    "defaultValue": "1000",
    "meaning": "The max number of executors for which the local dirs are stored. This size is both applied for the driver and both for the executors side to avoid having an unbounded store. This cache will be used to avoid the network in case of fetching disk persisted RDD blocks or shuffle blocks (whenspark.shuffle.readHostLocalDiskis set) from the same host.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.cleaner.periodicGC.interval",
    "defaultValue": "30min",
    "meaning": "Controls how often to trigger a garbage collection.This context cleaner triggers cleanups only when weak references are garbage collected. In long-running applications with large driver JVMs, where there is little memory pressure on the driver, this may happen very occasionally or not at all. Not cleaning at all may lead to executors running out of disk space after a while.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.cleaner.referenceTracking",
    "defaultValue": "true",
    "meaning": "Enables or disables context cleaning.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.cleaner.referenceTracking.blocking",
    "defaultValue": "true",
    "meaning": "Controls whether the cleaning thread should block on cleanup tasks (other than shuffle, which is controlled byspark.cleaner.referenceTracking.blocking.shuffleSpark property).",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.cleaner.referenceTracking.blocking.shuffle",
    "defaultValue": "false",
    "meaning": "Controls whether the cleaning thread should block on shuffle cleanup tasks.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.cleaner.referenceTracking.cleanCheckpoints",
    "defaultValue": "false",
    "meaning": "Controls whether to clean checkpoint files if the reference is out of scope.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.broadcast.blockSize",
    "defaultValue": "4m",
    "meaning": "Size of each piece of a block forTorrentBroadcastFactory, in KiB unless otherwise specified. Too large a value decreases parallelism during broadcast (makes it slower); however, if it is too small,BlockManagermight take a performance hit.",
    "sinceVersion": "0.5.0"
  },
  {
    "propertyName": "spark.broadcast.checksum",
    "defaultValue": "true",
    "meaning": "Whether to enable checksum for broadcast. If enabled, broadcasts will include a checksum, which can help detect corrupted blocks, at the cost of computing and sending a little more data. It's possible to disable it if the network has other mechanisms to guarantee data won't be corrupted during broadcast.",
    "sinceVersion": "2.1.1"
  },
  {
    "propertyName": "spark.broadcast.UDFCompressionThreshold",
    "defaultValue": "1 * 1024 * 1024",
    "meaning": "The threshold at which user-defined functions (UDFs) and Python RDD commands are compressed by broadcast in bytes unless otherwise specified.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.cores",
    "defaultValue": "1 in YARN mode, all the available cores on the worker in standalone mode.",
    "meaning": "The number of cores to use on each executor.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.default.parallelism",
    "defaultValue": "\"For distributed shuffle operations likereduceByKeyandjoin, the",
    "meaning": "",
    "sinceVersion": ""
  },
  {
    "propertyName": "largest number of partitions in a parent RDD.  For operations likeparallelizewith no parent RDDs, it depends on the cluster manager:Local mode: number of cores on the local machineOthers: total number of cores on all executor nodes or 2, whichever is larger\"",
    "defaultValue": "Default number of partitions in RDDs returned by transformations likejoin,reduceByKey, andparallelizewhen not set by user.",
    "meaning": "0.5.0",
    "sinceVersion": ""
  },
  {
    "propertyName": "spark.executor.heartbeatInterval",
    "defaultValue": "10s",
    "meaning": "Interval between each executor's heartbeats to the driver. Heartbeats let the driver know that the executor is still alive and update it with metrics for in-progress tasks. spark.executor.heartbeatInterval should be significantly less than spark.network.timeout",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.files.fetchTimeout",
    "defaultValue": "60s",
    "meaning": "Communication timeout to use when fetching files added through SparkContext.addFile() from the driver.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.files.useFetchCache",
    "defaultValue": "true",
    "meaning": "If set to true (default), file fetching will use a local cache that is shared by executors that belong to the same application, which can improve task launching performance when running many executors on the same host. If set to false, these caching optimizations will be disabled and all executors will fetch their own copies of files. This optimization may be disabled in order to use Spark local directories that reside on NFS filesystems (seeSPARK-6313for more details).",
    "sinceVersion": "1.2.2"
  },
  {
    "propertyName": "spark.files.overwrite",
    "defaultValue": "false",
    "meaning": "Whether to overwrite any files which exist at the startup. Users can not overwrite the files added bySparkContext.addFileorSparkContext.addJarbefore even if this option is settrue.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.files.ignoreCorruptFiles",
    "defaultValue": "false",
    "meaning": "Whether to ignore corrupt files. If true, the Spark jobs will continue to run when encountering corrupted or non-existing files and contents that have been read will still be returned.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.files.ignoreMissingFiles",
    "defaultValue": "false",
    "meaning": "Whether to ignore missing files. If true, the Spark jobs will continue to run when encountering missing files and the contents that have been read will still be returned.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.files.maxPartitionBytes",
    "defaultValue": "134217728 (128 MiB)",
    "meaning": "The maximum number of bytes to pack into a single partition when reading files.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.files.openCostInBytes",
    "defaultValue": "4194304 (4 MiB)",
    "meaning": "The estimated cost to open a file, measured by the number of bytes could be scanned at the same time. This is used when putting multiple files into a partition. It is better to overestimate, then the partitions with small files will be faster than partitions with bigger files.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.hadoop.cloneConf",
    "defaultValue": "false",
    "meaning": "If set to true, clones a new HadoopConfigurationobject for each task. This option should be enabled to work aroundConfigurationthread-safety issues (seeSPARK-2546for more details). This is disabled by default in order to avoid unexpected performance regressions for jobs that are not affected by these issues.",
    "sinceVersion": "1.0.3"
  },
  {
    "propertyName": "spark.hadoop.validateOutputSpecs",
    "defaultValue": "true",
    "meaning": "If set to true, validates the output specification (e.g. checking if the output directory already exists) used in saveAsHadoopFile and other variants. This can be disabled to silence exceptions due to pre-existing output directories. We recommend that users do not disable this except if trying to achieve compatibility with previous versions of Spark. Simply use Hadoop's FileSystem API to delete output directories by hand. This setting is ignored for jobs generated through Spark Streaming's StreamingContext, since data may need to be rewritten to pre-existing output directories during checkpoint recovery.",
    "sinceVersion": "1.0.1"
  },
  {
    "propertyName": "spark.storage.memoryMapThreshold",
    "defaultValue": "2m",
    "meaning": "Size of a block above which Spark memory maps when reading a block from disk. Default unit is bytes, unless specified otherwise. This prevents Spark from memory mapping very small blocks. In general, memory mapping has high overhead for blocks close to or below the page size of the operating system.",
    "sinceVersion": "0.9.2"
  },
  {
    "propertyName": "spark.storage.decommission.enabled",
    "defaultValue": "false",
    "meaning": "Whether to decommission the block manager when decommissioning executor.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.storage.decommission.shuffleBlocks.enabled",
    "defaultValue": "true",
    "meaning": "Whether to transfer shuffle blocks during block manager decommissioning. Requires a migratable shuffle resolver (like sort based shuffle).",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.storage.decommission.shuffleBlocks.maxThreads",
    "defaultValue": "8",
    "meaning": "Maximum number of threads to use in migrating shuffle files.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.storage.decommission.rddBlocks.enabled",
    "defaultValue": "true",
    "meaning": "Whether to transfer RDD blocks during block manager decommissioning.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.storage.decommission.fallbackStorage.path",
    "defaultValue": "(none)",
    "meaning": "The location for fallback storage during block manager decommissioning. For example,s3a://spark-storage/. In case of empty, fallback storage is disabled. The storage should be managed by TTL because Spark will not clean it up.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.storage.decommission.fallbackStorage.cleanUp",
    "defaultValue": "false",
    "meaning": "If true, Spark cleans up its fallback storage data during shutting down.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.storage.decommission.shuffleBlocks.maxDiskSize",
    "defaultValue": "(none)",
    "meaning": "Maximum disk space to use to store shuffle blocks before rejecting remote shuffle blocks. Rejecting remote shuffle blocks means that an executor will not receive any shuffle migrations, and if there are no other executors available for migration then shuffle blocks will be lost unlessspark.storage.decommission.fallbackStorage.pathis configured.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.hadoop.mapreduce.fileoutputcommitter.algorithm.version",
    "defaultValue": "1",
    "meaning": "The file output committer algorithm version, valid algorithm version number: 1 or 2. Note that 2 may cause a correctness issue like MAPREDUCE-7282.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.eventLog.logStageExecutorMetrics",
    "defaultValue": "false",
    "meaning": "Whether to write per-stage peaks of executor metrics (for each executor) to the event log.Note:The metrics are polled (collected) and sent in the executor heartbeat, and this is always done; this configuration is only to determine if aggregated metric peaks are written to the event log.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.processTreeMetrics.enabled",
    "defaultValue": "false",
    "meaning": "Whether to collect process tree metrics (from the /proc filesystem) when collecting executor metrics.Note:The process tree metrics are collected only if the /proc filesystem exists.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.metrics.pollingInterval",
    "defaultValue": "0",
    "meaning": "How often to collect executor metrics (in milliseconds).If 0, the polling is done on executor heartbeats (thus at the heartbeat interval, specified byspark.executor.heartbeatInterval). If positive, the polling is done at this interval.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.eventLog.gcMetrics.youngGenerationGarbageCollectors",
    "defaultValue": "Copy,PS Scavenge,ParNew,G1 Young Generation",
    "meaning": "Names of supported young generation garbage collector. A name usually is the return of GarbageCollectorMXBean.getName. The built-in young generation garbage collectors are Copy,PS Scavenge,ParNew,G1 Young Generation.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.eventLog.gcMetrics.oldGenerationGarbageCollectors",
    "defaultValue": "MarkSweepCompact,PS MarkSweep,ConcurrentMarkSweep,G1 Old Generation",
    "meaning": "Names of supported old generation garbage collector. A name usually is the return of GarbageCollectorMXBean.getName. The built-in old generation garbage collectors are MarkSweepCompact,PS MarkSweep,ConcurrentMarkSweep,G1 Old Generation.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.executor.metrics.fileSystemSchemes",
    "defaultValue": "file,hdfs",
    "meaning": "The file system schemes to report in executor metrics.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.rpc.message.maxSize",
    "defaultValue": "128",
    "meaning": "\"Maximum message size (in MiB) to allow in \"\"control plane\"\" communication; generally only applies to map output size information sent between executors and the driver. Increase this if you are running jobs with many thousands of map and reduce tasks and see messages about the RPC message size.\"",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.blockManager.port",
    "defaultValue": "(random)",
    "meaning": "Port for all block managers to listen on. These exist on both the driver and the executors.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.driver.blockManager.port",
    "defaultValue": "(value of spark.blockManager.port)",
    "meaning": "Driver-specific port for the block manager to listen on, for cases where it cannot use the same configuration as executors.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.driver.bindAddress",
    "defaultValue": "(value of spark.driver.host)",
    "meaning": "Hostname or IP address where to bind listening sockets. This config overrides the SPARK_LOCAL_IP environment variable (see below).It also allows a different address from the local one to be advertised to executors or external systems. This is useful, for example, when running containers with bridged networking. For this to properly work, the different ports used by the driver (RPC, block manager and UI) need to be forwarded from the container's host.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.driver.host",
    "defaultValue": "(local hostname)",
    "meaning": "Hostname or IP address for the driver. This is used for communicating with the executors and the standalone Master.",
    "sinceVersion": "0.7.0"
  },
  {
    "propertyName": "spark.driver.port",
    "defaultValue": "(random)",
    "meaning": "Port for the driver to listen on. This is used for communicating with the executors and the standalone Master.",
    "sinceVersion": "0.7.0"
  },
  {
    "propertyName": "spark.driver.metrics.pollingInterval",
    "defaultValue": "10s",
    "meaning": "How often to collect driver metrics (in milliseconds). If unset, the polling is done at the executor heartbeat interval. If set, the polling is done at this interval.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.io.mode.default",
    "defaultValue": "AUTO",
    "meaning": "The default IO mode for Netty transports. One ofNIO,EPOLL,KQUEUE, orAUTO. The default value isAUTOwhich means to use native Netty libraries if available. In other words, for Linux environments,EPOLLis used if available before usingNIO. For MacOS/BSD environments,KQUEUEis used if available before usingNIO.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.rpc.io.backLog",
    "defaultValue": "64",
    "meaning": "Length of the accept queue for the RPC server. For large applications, this value may need to be increased, so that incoming connections are not dropped when a large number of connections arrives in a short period of time.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.network.timeout",
    "defaultValue": "120s",
    "meaning": "Default timeout for all network interactions. This config will be used in place ofspark.storage.blockManagerHeartbeatTimeoutMs,spark.shuffle.io.connectionTimeout,spark.rpc.askTimeoutorspark.rpc.lookupTimeoutif they are not configured.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.network.timeoutInterval",
    "defaultValue": "60s",
    "meaning": "Interval for the driver to check and expire dead executors.",
    "sinceVersion": "1.3.2"
  },
  {
    "propertyName": "spark.network.io.preferDirectBufs",
    "defaultValue": "true",
    "meaning": "If enabled then off-heap buffer allocations are preferred by the shared allocators. Off-heap buffers are used to reduce garbage collection during shuffle and cache block transfer. For environments where off-heap memory is tightly limited, users may wish to turn this off to force all allocations to be on-heap.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.port.maxRetries",
    "defaultValue": "16",
    "meaning": "Maximum number of retries when binding to a port before giving up. When a port is given a specific value (non 0), each subsequent retry will increment the port used in the previous attempt by 1 before retrying. This essentially allows it to try a range of ports from the start port specified to port + maxRetries.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.rpc.askTimeout",
    "defaultValue": "spark.network.timeout",
    "meaning": "Duration for an RPC ask operation to wait before timing out.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.rpc.lookupTimeout",
    "defaultValue": "120s",
    "meaning": "Duration for an RPC remote endpoint lookup operation to wait before timing out.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.network.maxRemoteBlockSizeFetchToMem",
    "defaultValue": "200m",
    "meaning": "Remote block will be fetched to disk when size of the block is above this threshold in bytes. This is to avoid a giant request takes too much memory. Note this configuration will affect both shuffle fetch and block manager remote block fetch. For users who enabled external shuffle service, this feature can only work when external shuffle service is at least 2.3.0.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.rpc.io.connectionTimeout",
    "defaultValue": "value ofspark.network.timeout",
    "meaning": "Timeout for the established connections between RPC peers to be marked as idled and closed if there are outstanding RPC requests but no traffic on the channel for at leastconnectionTimeout.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.rpc.io.connectionCreationTimeout",
    "defaultValue": "value ofspark.rpc.io.connectionTimeout",
    "meaning": "Timeout for establishing a connection between RPC peers.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.cores.max",
    "defaultValue": "(not set)",
    "meaning": "When running on astandalone deploy cluster, the maximum amount of CPU cores to request for the application from across the cluster (not from each machine). If not set, the default will bespark.deploy.defaultCoreson Spark's standalone cluster manager.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.locality.wait",
    "defaultValue": "3s",
    "meaning": "How long to wait to launch a data-local task before giving up and launching it on a less-local node. The same wait will be used to step through multiple locality levels (process-local, node-local, rack-local and then any). It is also possible to customize the waiting time for each level by settingspark.locality.wait.node, etc. You should increase this setting if your tasks are long and see poor locality, but the default usually works well.",
    "sinceVersion": "0.5.0"
  },
  {
    "propertyName": "spark.locality.wait.node",
    "defaultValue": "spark.locality.wait",
    "meaning": "Customize the locality wait for node locality. For example, you can set this to 0 to skip node locality and search immediately for rack locality (if your cluster has rack information).",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.locality.wait.process",
    "defaultValue": "spark.locality.wait",
    "meaning": "Customize the locality wait for process locality. This affects tasks that attempt to access cached data in a particular executor process.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.locality.wait.rack",
    "defaultValue": "spark.locality.wait",
    "meaning": "Customize the locality wait for rack locality.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.scheduler.maxRegisteredResourcesWaitingTime",
    "defaultValue": "30s",
    "meaning": "Maximum amount of time to wait for resources to register before scheduling begins.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.scheduler.minRegisteredResourcesRatio",
    "defaultValue": "0.8 for KUBERNETES mode; 0.8 for YARN mode; 0.0 for standalone mode",
    "meaning": "The minimum ratio of registered resources (registered resources / total expected resources) (resources are executors in yarn mode and Kubernetes mode, CPU cores in standalone mode) to wait for before scheduling begins. Specified as a double between 0.0 and 1.0. Regardless of whether the minimum ratio of resources has been reached, the maximum amount of time it will wait before scheduling begins is controlled by configspark.scheduler.maxRegisteredResourcesWaitingTime.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.scheduler.mode",
    "defaultValue": "FIFO",
    "meaning": "Thescheduling modebetween jobs submitted to the same SparkContext. Can be set toFAIRto use fair sharing instead of queueing jobs one after another. Useful for multi-user services.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.scheduler.revive.interval",
    "defaultValue": "1s",
    "meaning": "The interval length for the scheduler to revive the worker resource offers to run tasks.",
    "sinceVersion": "0.8.1"
  },
  {
    "propertyName": "spark.scheduler.listenerbus.eventqueue.capacity",
    "defaultValue": "10000",
    "meaning": "The default capacity for event queues. Spark will try to initialize an event queue using capacity specified byspark.scheduler.listenerbus.eventqueue.queueName.capacityfirst. If it's not configured, Spark will use the default capacity specified by this config. Note that capacity must be greater than 0. Consider increasing value (e.g. 20000) if listener events are dropped. Increasing this value may result in the driver using more memory.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.scheduler.listenerbus.eventqueue.shared.capacity",
    "defaultValue": "spark.scheduler.listenerbus.eventqueue.capacity",
    "meaning": "Capacity for shared event queue in Spark listener bus, which hold events for external listener(s) that register to the listener bus. Consider increasing value, if the listener events corresponding to shared queue are dropped. Increasing this value may result in the driver using more memory.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.scheduler.listenerbus.eventqueue.appStatus.capacity",
    "defaultValue": "spark.scheduler.listenerbus.eventqueue.capacity",
    "meaning": "Capacity for appStatus event queue, which hold events for internal application status listeners. Consider increasing value, if the listener events corresponding to appStatus queue are dropped. Increasing this value may result in the driver using more memory.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.scheduler.listenerbus.eventqueue.executorManagement.capacity",
    "defaultValue": "spark.scheduler.listenerbus.eventqueue.capacity",
    "meaning": "Capacity for executorManagement event queue in Spark listener bus, which hold events for internal executor management listeners. Consider increasing value if the listener events corresponding to executorManagement queue are dropped. Increasing this value may result in the driver using more memory.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.scheduler.listenerbus.eventqueue.eventLog.capacity",
    "defaultValue": "spark.scheduler.listenerbus.eventqueue.capacity",
    "meaning": "Capacity for eventLog queue in Spark listener bus, which hold events for Event logging listeners that write events to eventLogs. Consider increasing value if the listener events corresponding to eventLog queue are dropped. Increasing this value may result in the driver using more memory.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.scheduler.listenerbus.eventqueue.streams.capacity",
    "defaultValue": "spark.scheduler.listenerbus.eventqueue.capacity",
    "meaning": "Capacity for streams queue in Spark listener bus, which hold events for internal streaming listener. Consider increasing value if the listener events corresponding to streams queue are dropped. Increasing this value may result in the driver using more memory.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.scheduler.resource.profileMergeConflicts",
    "defaultValue": "false",
    "meaning": "\"If set to \"\"true\"\", Spark will merge ResourceProfiles when different profiles are specified in RDDs that get combined into a single stage. When they are merged, Spark chooses the maximum of each resource and creates a new ResourceProfile. The default of false results in Spark throwing an exception if multiple different ResourceProfiles are found in RDDs going into the same stage.\"",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.scheduler.excludeOnFailure.unschedulableTaskSetTimeout",
    "defaultValue": "120s",
    "meaning": "The timeout in seconds to wait to acquire a new executor and schedule a task before aborting a TaskSet which is unschedulable because all executors are excluded due to task failures.",
    "sinceVersion": "2.4.1"
  },
  {
    "propertyName": "spark.standalone.submit.waitAppCompletion",
    "defaultValue": "false",
    "meaning": "If set to true, Spark will merge ResourceProfiles when different profiles are specified in RDDs that get combined into a single stage. When they are merged, Spark chooses the maximum of each resource and creates a new ResourceProfile. The default of false results in Spark throwing an exception if multiple different ResourceProfiles are found in RDDs going into the same stage.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.enabled",
    "defaultValue": "false",
    "meaning": "\"If set to \"\"true\"\", prevent Spark from scheduling tasks on executors that have been excluded due to too many task failures. The algorithm used to exclude executors and nodes can be further controlled by the other \"\"spark.excludeOnFailure\"\" configuration options. This config will be overridden by \"\"spark.excludeOnFailure.application.enabled\"\" and \"\"spark.excludeOnFailure.taskAndStage.enabled\"\" to specify exclusion enablement on individual levels.\"",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.application.enabled",
    "defaultValue": "false",
    "meaning": "\"If set to \"\"true\"\", enables excluding executors for the entire application due to too many task failures and prevent Spark from scheduling tasks on them. This config overrides \"\"spark.excludeOnFailure.enabled\"\".\"",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.taskAndStage.enabled",
    "defaultValue": "false",
    "meaning": "\"If set to \"\"true\"\", enables excluding executors on a task set level due to too many task failures and prevent Spark from scheduling tasks on them. This config overrides \"\"spark.excludeOnFailure.enabled\"\".\"",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.timeout",
    "defaultValue": "1h",
    "meaning": "(Experimental) How long a node or executor is excluded for the entire application, before it is unconditionally removed from the excludelist to attempt running new tasks.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.task.maxTaskAttemptsPerExecutor",
    "defaultValue": "1",
    "meaning": "(Experimental) For a given task, how many times it can be retried on one executor before the executor is excluded for that task.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.task.maxTaskAttemptsPerNode",
    "defaultValue": "2",
    "meaning": "(Experimental) For a given task, how many times it can be retried on one node, before the entire node is excluded for that task.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.stage.maxFailedTasksPerExecutor",
    "defaultValue": "2",
    "meaning": "(Experimental) How many different tasks must fail on one executor, within one stage, before the executor is excluded for that stage.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.stage.maxFailedExecutorsPerNode",
    "defaultValue": "2",
    "meaning": "(Experimental) How many different executors are marked as excluded for a given stage, before the entire node is marked as failed for the stage.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.application.maxFailedTasksPerExecutor",
    "defaultValue": "2",
    "meaning": "(Experimental) How many different tasks must fail on one executor, in successful task sets, before the executor is excluded for the entire application. Excluded executors will be automatically added back to the pool of available resources after the timeout specified byspark.excludeOnFailure.timeout. Note that with dynamic allocation, though, the executors may get marked as idle and be reclaimed by the cluster manager.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.application.maxFailedExecutorsPerNode",
    "defaultValue": "2",
    "meaning": "(Experimental) How many different executors must be excluded for the entire application, before the node is excluded for the entire application. Excluded nodes will be automatically added back to the pool of available resources after the timeout specified byspark.excludeOnFailure.timeout. Note that with dynamic allocation, though, the executors on the node may get marked as idle and be reclaimed by the cluster manager.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.killExcludedExecutors",
    "defaultValue": "false",
    "meaning": "\"(Experimental) If set to \"\"true\"\", allow Spark to automatically kill the executors when they are excluded on fetch failure or excluded for the entire application, as controlled by spark.killExcludedExecutors.application.*. Note that, when an entire node is added excluded, all of the executors on that node will be killed.\"",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.excludeOnFailure.application.fetchFailure.enabled",
    "defaultValue": "false",
    "meaning": "\"(Experimental) If set to \"\"true\"\", Spark will exclude the executor immediately when a fetch failure happens. If external shuffle service is enabled, then the whole node will be excluded.\"",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.speculation",
    "defaultValue": "false",
    "meaning": "\"If set to \"\"true\"\", performs speculative execution of tasks. This means if one or more tasks are running slowly in a stage, they will be re-launched.\"",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.speculation.interval",
    "defaultValue": "100ms",
    "meaning": "How often Spark will check for tasks to speculate.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.speculation.multiplier",
    "defaultValue": "3",
    "meaning": "How many times slower a task is than the median to be considered for speculation.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.speculation.quantile",
    "defaultValue": "0.9",
    "meaning": "Fraction of tasks which must be complete before speculation is enabled for a particular stage.",
    "sinceVersion": "0.6.0"
  },
  {
    "propertyName": "spark.speculation.minTaskRuntime",
    "defaultValue": "100ms",
    "meaning": "Minimum amount of time a task runs before being considered for speculation. This can be used to avoid launching speculative copies of tasks that are very short.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.speculation.task.duration.threshold",
    "defaultValue": "None",
    "meaning": "Task duration after which scheduler would try to speculative run the task. If provided, tasks would be speculatively run if current stage contains less tasks than or equal to the number of slots on a single executor and the task is taking longer time than the threshold. This config helps speculate stage with very few tasks. Regular speculation configs may also apply if the executor slots are large enough. E.g. tasks might be re-launched if there are enough successful runs even though the threshold hasn't been reached. The number of slots is computed based on the conf values of spark.executor.cores and spark.task.cpus minimum 1. Default unit is bytes, unless otherwise specified.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.speculation.efficiency.processRateMultiplier",
    "defaultValue": "0.75",
    "meaning": "A multiplier that used when evaluating inefficient tasks. The higher the multiplier is, the more tasks will be possibly considered as inefficient.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.speculation.efficiency.longRunTaskFactor",
    "defaultValue": "2",
    "meaning": "A task will be speculated anyway as long as its duration has exceeded the value of multiplying the factor and the time threshold (either bespark.speculation.multiplier* successfulTaskDurations.median orspark.speculation.minTaskRuntime) regardless of it's data process rate is good or not. This avoids missing the inefficient tasks when task slow isn't related to data process rate.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.speculation.efficiency.enabled",
    "defaultValue": "true",
    "meaning": "When set to true, spark will evaluate the efficiency of task processing through the stage task metrics or its duration, and only need to speculate the inefficient tasks. A task is inefficient when 1)its data process rate is less than the average data process rate of all successful tasks in the stage multiplied by a multiplier or 2)its duration has exceeded the value of multiplyingspark.speculation.efficiency.longRunTaskFactorand the time threshold (either bespark.speculation.multiplier* successfulTaskDurations.median orspark.speculation.minTaskRuntime).",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.task.cpus",
    "defaultValue": "1",
    "meaning": "Number of cores to allocate for each task.",
    "sinceVersion": "0.5.0"
  },
  {
    "propertyName": "spark.task.resource.{resourceName}.amount",
    "defaultValue": "1",
    "meaning": "Amount of a particular resource type to allocate for each task, note that this can be a double. If this is specified you must also provide the executor configspark.executor.resource.{resourceName}.amountand any corresponding discovery configs so that your executors are created with that resource type. In addition to whole amounts, a fractional amount (for example, 0.25, which means 1/4th of a resource) may be specified. Fractional amounts must be less than or equal to 0.5, or in other words, the minimum amount of resource sharing is 2 tasks per resource. Additionally, fractional amounts are floored in order to assign resource slots (e.g. a 0.2222 configuration, or 1/0.2222 slots will become 4 tasks/resource, not 5).",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.task.maxFailures",
    "defaultValue": "4",
    "meaning": "Number of continuous failures of any particular task before giving up on the job. The total number of failures spread across different tasks will not cause the job to fail; a particular task has to fail this number of attempts continuously. If any attempt succeeds, the failure count for the task will be reset. Should be greater than or equal to 1. Number of allowed retries = this value - 1.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.task.reaper.enabled",
    "defaultValue": "false",
    "meaning": "Enables monitoring of killed / interrupted tasks. When set to true, any task which is killed will be monitored by the executor until that task actually finishes executing. See the otherspark.task.reaper.*configurations for details on how to control the exact behavior of this monitoring. When set to false (the default), task killing will use an older code path which lacks such monitoring.",
    "sinceVersion": "2.0.3"
  },
  {
    "propertyName": "spark.task.reaper.pollingInterval",
    "defaultValue": "10s",
    "meaning": "Whenspark.task.reaper.enabled = true, this setting controls the frequency at which executors will poll the status of killed tasks. If a killed task is still running when polled then a warning will be logged and, by default, a thread-dump of the task will be logged (this thread dump can be disabled via thespark.task.reaper.threadDumpsetting, which is documented below).",
    "sinceVersion": "2.0.3"
  },
  {
    "propertyName": "spark.task.reaper.threadDump",
    "defaultValue": "true",
    "meaning": "Whenspark.task.reaper.enabled = true, this setting controls whether task thread dumps are logged during periodic polling of killed tasks. Set this to false to disable collection of thread dumps.",
    "sinceVersion": "2.0.3"
  },
  {
    "propertyName": "spark.task.reaper.killTimeout",
    "defaultValue": "-1",
    "meaning": "Whenspark.task.reaper.enabled = true, this setting specifies a timeout after which the executor JVM will kill itself if a killed task has not stopped running. The default value, -1, disables this mechanism and prevents the executor from self-destructing. The purpose of this setting is to act as a safety-net to prevent runaway noncancellable tasks from rendering an executor unusable.",
    "sinceVersion": "2.0.3"
  },
  {
    "propertyName": "spark.stage.maxConsecutiveAttempts",
    "defaultValue": "4",
    "meaning": "Number of consecutive stage attempts allowed before a stage is aborted.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.stage.ignoreDecommissionFetchFailure",
    "defaultValue": "true",
    "meaning": "Whether ignore stage fetch failure caused by executor decommission when countspark.stage.maxConsecutiveAttempts",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.barrier.sync.timeout",
    "defaultValue": "365d",
    "meaning": "The timeout in seconds for eachbarrier()call from a barrier task. If the coordinator didn't receive all the sync messages from barrier tasks within the configured time, throw a SparkException to fail all the tasks. The default value is set to 31536000(3600 * 24 * 365) so thebarrier()call shall wait for one year.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.scheduler.barrier.maxConcurrentTasksCheck.interval",
    "defaultValue": "15s",
    "meaning": "Time in seconds to wait between a max concurrent tasks check failure and the next check. A max concurrent tasks check ensures the cluster can launch more concurrent tasks than required by a barrier stage on job submitted. The check can fail in case a cluster has just started and not enough executors have registered, so we wait for a little while and try to perform the check again. If the check fails more than a configured max failure times for a job then fail current job submission. Note this config only applies to jobs that contain one or more barrier stages, we won't perform the check on non-barrier jobs.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.scheduler.barrier.maxConcurrentTasksCheck.maxFailures",
    "defaultValue": "40",
    "meaning": "Number of max concurrent tasks check failures allowed before fail a job submission. A max concurrent tasks check ensures the cluster can launch more concurrent tasks than required by a barrier stage on job submitted. The check can fail in case a cluster has just started and not enough executors have registered, so we wait for a little while and try to perform the check again. If the check fails more than a configured max failure times for a job then fail current job submission. Note this config only applies to jobs that contain one or more barrier stages, we won't perform the check on non-barrier jobs.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.enabled",
    "defaultValue": "false",
    "meaning": "Whether to use dynamic resource allocation, which scales the number of executors registered with this application up and down based on the workload. For more detail, see the descriptionhere.This requires one of the following conditions: 1) enabling external shuffle service throughspark.shuffle.service.enabled, or 2) enabling shuffle tracking throughspark.dynamicAllocation.shuffleTracking.enabled, or 3) enabling shuffle blocks decommission throughspark.decommission.enabledandspark.storage.decommission.shuffleBlocks.enabled, or 4) (Experimental) configuringspark.shuffle.sort.io.plugin.classto use a customShuffleDataIOwho'sShuffleDriverComponentssupports reliable storage. The following configurations are also relevant:spark.dynamicAllocation.minExecutors,spark.dynamicAllocation.maxExecutors, andspark.dynamicAllocation.initialExecutorsspark.dynamicAllocation.executorAllocationRatio",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.executorIdleTimeout",
    "defaultValue": "60s",
    "meaning": "If dynamic allocation is enabled and an executor has been idle for more than this duration, the executor will be removed. For more detail, see thisdescription.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.cachedExecutorIdleTimeout",
    "defaultValue": "infinity",
    "meaning": "If dynamic allocation is enabled and an executor which has cached data blocks has been idle for more than this duration, the executor will be removed. For more details, see thisdescription.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.initialExecutors",
    "defaultValue": "spark.dynamicAllocation.minExecutors",
    "meaning": "Initial number of executors to run if dynamic allocation is enabled.If--num-executors(orspark.executor.instances) is set and larger than this value, it will be used as the initial number of executors.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.maxExecutors",
    "defaultValue": "infinity",
    "meaning": "Upper bound for the number of executors if dynamic allocation is enabled.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.minExecutors",
    "defaultValue": "0",
    "meaning": "Lower bound for the number of executors if dynamic allocation is enabled.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.executorAllocationRatio",
    "defaultValue": "1",
    "meaning": "By default, the dynamic allocation will request enough executors to maximize the parallelism according to the number of tasks to process. While this minimizes the latency of the job, with small tasks this setting can waste a lot of resources due to executor allocation overhead, as some executor might not even do any work. This setting allows to set a ratio that will be used to reduce the number of executors w.r.t. full parallelism. Defaults to 1.0 to give maximum parallelism. 0.5 will divide the target number of executors by 2 The target number of executors computed by the dynamicAllocation can still be overridden by thespark.dynamicAllocation.minExecutorsandspark.dynamicAllocation.maxExecutorssettings",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.schedulerBacklogTimeout",
    "defaultValue": "1s",
    "meaning": "If dynamic allocation is enabled and there have been pending tasks backlogged for more than this duration, new executors will be requested. For more detail, see thisdescription.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.sustainedSchedulerBacklogTimeout",
    "defaultValue": "schedulerBacklogTimeout",
    "meaning": "Same asspark.dynamicAllocation.schedulerBacklogTimeout, but used only for subsequent executor requests. For more detail, see thisdescription.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.shuffleTracking.enabled",
    "defaultValue": "true",
    "meaning": "Enables shuffle file tracking for executors, which allows dynamic allocation without the need for an external shuffle service. This option will try to keep alive executors that are storing shuffle data for active jobs.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.dynamicAllocation.shuffleTracking.timeout",
    "defaultValue": "infinity",
    "meaning": "When shuffle tracking is enabled, controls the timeout for executors that are holding shuffle data. The default value means that Spark will rely on the shuffles being garbage collected to be able to release executors. If for some reason garbage collection is not cleaning up shuffles quickly enough, this option can be used to control when to time out executors even when they are storing shuffle data.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "\"spark.{driver",
    "defaultValue": "executor}.rpc.io.serverThreads\"",
    "meaning": "Fall back onspark.rpc.io.serverThreads",
    "sinceVersion": "Number of threads used in the server thread pool"
  },
  {
    "propertyName": "\"spark.{driver",
    "defaultValue": "executor}.rpc.io.clientThreads\"",
    "meaning": "Fall back onspark.rpc.io.clientThreads",
    "sinceVersion": "Number of threads used in the client thread pool"
  },
  {
    "propertyName": "\"spark.{driver",
    "defaultValue": "executor}.rpc.netty.dispatcher.numThreads\"",
    "meaning": "Fall back onspark.rpc.netty.dispatcher.numThreads",
    "sinceVersion": "Number of threads used in RPC message dispatcher thread pool"
  },
  {
    "propertyName": "spark.api.mode",
    "defaultValue": "classic",
    "meaning": "For Spark Classic applications, specify whether to automatically use Spark Connect by running a local Spark Connect server. The value can beclassicorconnect.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.connect.grpc.binding.address",
    "defaultValue": "(none)",
    "meaning": "Address for Spark Connect server to bind.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.connect.grpc.binding.port",
    "defaultValue": "15002",
    "meaning": "Port for Spark Connect server to bind.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.grpc.port.maxRetries",
    "defaultValue": "0",
    "meaning": "The max port retry attempts for the gRPC server binding. By default, it's set to 0, and the server will fail fast in case of port conflicts.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.connect.grpc.interceptor.classes",
    "defaultValue": "(none)",
    "meaning": "Comma separated list of class names that must implement theio.grpc.ServerInterceptorinterface",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.grpc.arrow.maxBatchSize",
    "defaultValue": "4m",
    "meaning": "When using Apache Arrow, limit the maximum size of one arrow batch that can be sent from server side to client side. Currently, we conservatively use 70% of it because the size is not accurate but estimated.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.grpc.maxInboundMessageSize",
    "defaultValue": "134217728",
    "meaning": "Sets the maximum inbound message size for the gRPC requests. Requests with a larger payload will fail.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.extensions.relation.classes",
    "defaultValue": "(none)",
    "meaning": "Comma separated list of classes that implement the traitorg.apache.spark.sql.connect.plugin.RelationPluginto support custom Relation types in proto.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.extensions.expression.classes",
    "defaultValue": "(none)",
    "meaning": "Comma separated list of classes that implement the traitorg.apache.spark.sql.connect.plugin.ExpressionPluginto support custom Expression types in proto.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.extensions.command.classes",
    "defaultValue": "(none)",
    "meaning": "Comma separated list of classes that implement the traitorg.apache.spark.sql.connect.plugin.CommandPluginto support custom Command types in proto.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.connect.ml.backend.classes",
    "defaultValue": "(none)",
    "meaning": "Comma separated list of classes that implement the traitorg.apache.spark.sql.connect.plugin.MLBackendPluginto replace the specified Spark ML operators with a backend-specific implementation.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.connect.jvmStacktrace.maxSize",
    "defaultValue": "1024",
    "meaning": "Sets the maximum stack trace size to display when `spark.sql.pyspark.jvmStacktrace.enabled` is true.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.connect.ui.retainedSessions",
    "defaultValue": "200",
    "meaning": "The number of client sessions kept in the Spark Connect UI history.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.connect.ui.retainedStatements",
    "defaultValue": "200",
    "meaning": "The number of statements kept in the Spark Connect UI history.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.connect.enrichError.enabled",
    "defaultValue": "true",
    "meaning": "When true, it enriches errors with full exception messages and optionally server-side stacktrace on the client side via an additional RPC.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.connect.serverStacktrace.enabled",
    "defaultValue": "true",
    "meaning": "When true, it sets the server-side stacktrace in the user-facing Spark exception.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.connect.grpc.maxMetadataSize",
    "defaultValue": "1024",
    "meaning": "Sets the maximum size of metadata fields. For instance, it restricts metadata fields in `ErrorInfo`.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.connect.progress.reportInterval",
    "defaultValue": "2s",
    "meaning": "The interval at which the progress of a query is reported to the client. If the value is set to a negative value the progress reports will be disabled.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.advisoryPartitionSizeInBytes",
    "defaultValue": "(value ofspark.sql.adaptive.shuffle.targetPostShuffleInputSize)",
    "meaning": "The advisory size in bytes of the shuffle partition during adaptive optimization (when spark.sql.adaptive.enabled is true). It takes effect when Spark coalesces small shuffle partitions or splits skewed shuffle partition.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.autoBroadcastJoinThreshold",
    "defaultValue": "(none)",
    "meaning": "Configures the maximum size in bytes for a table that will be broadcast to all worker nodes when performing a join. By setting this value to -1 broadcasting can be disabled. The default value is same with spark.sql.autoBroadcastJoinThreshold. Note that, this config is used only in adaptive framework.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.adaptive.coalescePartitions.enabled",
    "defaultValue": "true",
    "meaning": "When true and 'spark.sql.adaptive.enabled' is true, Spark will coalesce contiguous shuffle partitions according to the target size (specified by 'spark.sql.adaptive.advisoryPartitionSizeInBytes'), to avoid too many small tasks.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.coalescePartitions.initialPartitionNum",
    "defaultValue": "(none)",
    "meaning": "The initial number of shuffle partitions before coalescing. If not set, it equals to spark.sql.shuffle.partitions. This configuration only has an effect when 'spark.sql.adaptive.enabled' and 'spark.sql.adaptive.coalescePartitions.enabled' are both true.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.coalescePartitions.minPartitionSize",
    "defaultValue": "1MB",
    "meaning": "The minimum size of shuffle partitions after coalescing. This is useful when the adaptively calculated target size is too small during partition coalescing.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.adaptive.coalescePartitions.parallelismFirst",
    "defaultValue": "true",
    "meaning": "When true, Spark does not respect the target size specified by 'spark.sql.adaptive.advisoryPartitionSizeInBytes' (default 64MB) when coalescing contiguous shuffle partitions, but adaptively calculate the target size according to the default parallelism of the Spark cluster. The calculated size is usually smaller than the configured target size. This is to maximize the parallelism and avoid performance regressions when enabling adaptive query execution. It's recommended to set this config to false on a busy cluster to make resource utilization more efficient (not many small tasks).",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.adaptive.customCostEvaluatorClass",
    "defaultValue": "(none)",
    "meaning": "The custom cost evaluator class to be used for adaptive execution. If not being set, Spark will use its own SimpleCostEvaluator by default.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.adaptive.enabled",
    "defaultValue": "true",
    "meaning": "When true, enable adaptive query execution, which re-optimizes the query plan in the middle of query execution, based on accurate runtime statistics.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.sql.adaptive.forceOptimizeSkewedJoin",
    "defaultValue": "false",
    "meaning": "When true, force enable OptimizeSkewedJoin even if it introduces extra shuffle.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.adaptive.localShuffleReader.enabled",
    "defaultValue": "true",
    "meaning": "When true and 'spark.sql.adaptive.enabled' is true, Spark tries to use local shuffle reader to read the shuffle data when the shuffle partitioning is not needed, for example, after converting sort-merge join to broadcast-hash join.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.maxShuffledHashJoinLocalMapThreshold",
    "defaultValue": "0b",
    "meaning": "Configures the maximum size in bytes per partition that can be allowed to build local hash map. If this value is not smaller than spark.sql.adaptive.advisoryPartitionSizeInBytes and all the partition size are not larger than this config, join selection prefer to use shuffled hash join instead of sort merge join regardless of the value of spark.sql.join.preferSortMergeJoin.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.adaptive.optimizeSkewsInRebalancePartitions.enabled",
    "defaultValue": "true",
    "meaning": "When true and 'spark.sql.adaptive.enabled' is true, Spark will optimize the skewed shuffle partitions in RebalancePartitions and split them to smaller ones according to the target size (specified by 'spark.sql.adaptive.advisoryPartitionSizeInBytes'), to avoid data skew.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.adaptive.optimizer.excludedRules",
    "defaultValue": "(none)",
    "meaning": "Configures a list of rules to be disabled in the adaptive optimizer, in which the rules are specified by their rule names and separated by comma. The optimizer will log the rules that have indeed been excluded.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.adaptive.rebalancePartitionsSmallPartitionFactor",
    "defaultValue": "0.2",
    "meaning": "A partition will be merged during splitting if its size is small than this factor multiply spark.sql.adaptive.advisoryPartitionSizeInBytes.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.adaptive.skewJoin.enabled",
    "defaultValue": "true",
    "meaning": "When true and 'spark.sql.adaptive.enabled' is true, Spark dynamically handles skew in shuffled join (sort-merge and shuffled hash) by splitting (and replicating if needed) skewed partitions.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.skewJoin.skewedPartitionFactor",
    "defaultValue": "5.0",
    "meaning": "A partition is considered as skewed if its size is larger than this factor multiplying the median partition size and also larger than 'spark.sql.adaptive.skewJoin.skewedPartitionThresholdInBytes'",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.skewJoin.skewedPartitionThresholdInBytes",
    "defaultValue": "256MB",
    "meaning": "A partition is considered as skewed if its size in bytes is larger than this threshold and also larger than 'spark.sql.adaptive.skewJoin.skewedPartitionFactor' multiplying the median partition size. Ideally this config should be set larger than 'spark.sql.adaptive.advisoryPartitionSizeInBytes'.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.adaptive.streaming.stateless.enabled",
    "defaultValue": "true",
    "meaning": "When true, enable adaptive query execution for stateless streaming query. To enable this config,spark.sql.adaptive.enabledneeds to be also enabled.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.allowNamedFunctionArguments",
    "defaultValue": "true",
    "meaning": "If true, Spark will turn on support for named parameters for all functions that has it implemented.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.ansi.doubleQuotedIdentifiers",
    "defaultValue": "false",
    "meaning": "\"When true and 'spark.sql.ansi.enabled' is true, Spark SQL reads literals enclosed in double quoted (\"\") as identifiers. When false they are read as string literals.\"",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.ansi.enabled",
    "defaultValue": "true",
    "meaning": "\"When true, Spark SQL uses an ANSI compliant dialect instead of being Hive compliant. For example, Spark will throw an exception at runtime instead of returning null results when the inputs to a SQL operator/function are invalid. For full details of this dialect, you can find them in the section \"\"ANSI Compliance\"\" of Spark's documentation. Some ANSI dialect features may be not from the ANSI SQL standard directly, but their behaviors align with ANSI SQL's style\"",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.ansi.enforceReservedKeywords",
    "defaultValue": "false",
    "meaning": "When true and 'spark.sql.ansi.enabled' is true, the Spark SQL parser enforces the ANSI reserved keywords and forbids SQL queries that use reserved keywords as alias names and/or identifiers for table, view, function, etc.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.ansi.relationPrecedence",
    "defaultValue": "false",
    "meaning": "When true and 'spark.sql.ansi.enabled' is true, JOIN takes precedence over comma when combining relation. For example,t1, t2 JOIN t3should result tot1 X (t2 X t3). If the config is false, the result is(t1 X t2) X t3.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.autoBroadcastJoinThreshold",
    "defaultValue": "10MB",
    "meaning": "Configures the maximum size in bytes for a table that will be broadcast to all worker nodes when performing a join. By setting this value to -1 broadcasting can be disabled.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.sql.avro.compression.codec",
    "defaultValue": "snappy",
    "meaning": "Compression codec used in writing of AVRO files. Supported codecs: uncompressed, deflate, snappy, bzip2, xz and zstandard. Default codec is snappy.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.avro.deflate.level",
    "defaultValue": "-1",
    "meaning": "Compression level for the deflate codec used in writing of AVRO files. Valid value must be in the range of from 1 to 9 inclusive or -1. The default value is -1 which corresponds to 6 level in the current implementation.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.avro.filterPushdown.enabled",
    "defaultValue": "true",
    "meaning": "When true, enable filter pushdown to Avro datasource.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.avro.xz.level",
    "defaultValue": "6",
    "meaning": "Compression level for the xz codec used in writing of AVRO files. Valid value must be in the range of from 1 to 9 inclusive The default value is 6.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.avro.zstandard.bufferPool.enabled",
    "defaultValue": "false",
    "meaning": "If true, enable buffer pool of ZSTD JNI library when writing of AVRO files",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.avro.zstandard.level",
    "defaultValue": "3",
    "meaning": "Compression level for the zstandard codec used in writing of AVRO files.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.binaryOutputStyle",
    "defaultValue": "(none)",
    "meaning": "The output style used display binary data. Valid values are 'UTF-8', 'BASIC', 'BASE64', 'HEX', and 'HEX_DISCRETE'.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.broadcastTimeout",
    "defaultValue": "300",
    "meaning": "Timeout in seconds for the broadcast wait time in broadcast joins.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.sql.bucketing.coalesceBucketsInJoin.enabled",
    "defaultValue": "false",
    "meaning": "When true, if two bucketed tables with the different number of buckets are joined, the side with a bigger number of buckets will be coalesced to have the same number of buckets as the other side. Bigger number of buckets is divisible by the smaller number of buckets. Bucket coalescing is applied to sort-merge joins and shuffled hash join. Note: Coalescing bucketed table can avoid unnecessary shuffling in join, but it also reduces parallelism and could possibly cause OOM for shuffled hash join.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.bucketing.coalesceBucketsInJoin.maxBucketRatio",
    "defaultValue": "4",
    "meaning": "The ratio of the number of two buckets being coalesced should be less than or equal to this value for bucket coalescing to be applied. This configuration only has an effect when 'spark.sql.bucketing.coalesceBucketsInJoin.enabled' is set to true.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.catalog.spark_catalog",
    "defaultValue": "builtin",
    "meaning": "A catalog implementation that will be used as the v2 interface to Spark's built-in v1 catalog: spark_catalog. This catalog shares its identifier namespace with the spark_catalog and must be consistent with it; for example, if a table can be loaded by the spark_catalog, this catalog must also return the table metadata. To delegate operations to the spark_catalog, implementations can extend 'CatalogExtension'. The value should be either 'builtin' which represents the spark's builit-in V2SessionCatalog, or a fully qualified class name of the catalog implementation.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.cbo.enabled",
    "defaultValue": "false",
    "meaning": "Enables CBO for estimation of plan statistics when set true.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.cbo.joinReorder.dp.star.filter",
    "defaultValue": "false",
    "meaning": "Applies star-join filter heuristics to cost based join enumeration.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.cbo.joinReorder.dp.threshold",
    "defaultValue": "12",
    "meaning": "The maximum number of joined nodes allowed in the dynamic programming algorithm.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.cbo.joinReorder.enabled",
    "defaultValue": "false",
    "meaning": "Enables join reorder in CBO.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.cbo.planStats.enabled",
    "defaultValue": "false",
    "meaning": "When true, the logical plan will fetch row counts and column statistics from catalog.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.cbo.starSchemaDetection",
    "defaultValue": "false",
    "meaning": "When true, it enables join reordering based on star schema detection.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.charAsVarchar",
    "defaultValue": "false",
    "meaning": "When true, Spark replaces CHAR type with VARCHAR type in CREATE/REPLACE/ALTER TABLE commands, so that newly created/updated tables will not have CHAR type columns/fields. Existing tables with CHAR type columns/fields are not affected by this config.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.chunkBase64String.enabled",
    "defaultValue": "true",
    "meaning": "Whether to truncate string generated by theBase64function. When true, base64 strings generated by the base64 function are chunked into lines of at most 76 characters. When false, the base64 strings are not chunked.",
    "sinceVersion": "3.5.2"
  },
  {
    "propertyName": "spark.sql.classic.shuffleDependency.fileCleanup.enabled",
    "defaultValue": "false",
    "meaning": "When enabled, shuffle files will be cleaned up at the end of classic SQL executions. Note that this cleanup may cause stage retries and regenerate shuffle files if the same dataframe reference is executed again.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.cli.print.header",
    "defaultValue": "false",
    "meaning": "When set to true, spark-sql CLI prints the names of the columns in query output.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.columnNameOfCorruptRecord",
    "defaultValue": "_corrupt_record",
    "meaning": "The name of internal column for storing raw/un-parsed JSON and CSV records that fail to parse.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.sql.connect.shuffleDependency.fileCleanup.enabled",
    "defaultValue": "(value ofspark.sql.shuffleDependency.fileCleanup.enabled)",
    "meaning": "When enabled, shuffle files will be cleaned up at the end of Spark Connect SQL executions.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.csv.filterPushdown.enabled",
    "defaultValue": "true",
    "meaning": "When true, enable filter pushdown to CSV datasource.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.cteRecursionAnchorRowsLimitToConvertToLocalRelation",
    "defaultValue": "100",
    "meaning": "Maximum number of rows that the anchor in a recursive CTE can return for it to beconverted to a localRelation.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.cteRecursionLevelLimit",
    "defaultValue": "100",
    "meaning": "Maximum level of recursion that is allowed while executing a recursive CTE definition.If a query does not get exhausted before reaching this limit it fails. Use -1 for unlimited.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.cteRecursionRowLimit",
    "defaultValue": "1000000",
    "meaning": "Maximum number of rows that can be returned when executing a recursive CTE definition.If a query does not get exhausted before reaching this limit it fails. Use -1 for unlimited.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.datetime.java8API.enabled",
    "defaultValue": "false",
    "meaning": "If the configuration property is set to true, java.time.Instant and java.time.LocalDate classes of Java 8 API are used as external types for Catalyst's TimestampType and DateType. If it is set to false, java.sql.Timestamp and java.sql.Date are used for the same purpose.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.debug.maxToStringFields",
    "defaultValue": "25",
    "meaning": "\"Maximum number of fields of sequence-like entries can be converted to strings in debug output. Any elements beyond the limit will be dropped and replaced by a \"\"... N more fields\"\" placeholder.\"",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.defaultCacheStorageLevel",
    "defaultValue": "MEMORY_AND_DISK",
    "meaning": "The default storage level ofdataset.cache(),catalog.cacheTable()and sql queryCACHE TABLE t.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.defaultCatalog",
    "defaultValue": "spark_catalog",
    "meaning": "Name of the default catalog. This will be the current catalog if users have not explicitly set the current catalog yet.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.error.messageFormat",
    "defaultValue": "PRETTY",
    "meaning": "When PRETTY, the error message consists of textual representation of error class, message and query context. The MINIMAL and STANDARD formats are pretty JSON formats where STANDARD includes an additional JSON fieldmessage. This configuration property influences on error messages of Thrift Server and SQL CLI while running queries.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.compression.codec",
    "defaultValue": "none",
    "meaning": "Compression codec used to compress Arrow IPC data when transferring data between JVM and Python processes (e.g., toPandas, toArrow). This can significantly reduce memory usage and network bandwidth when transferring large datasets. Supported codecs: 'none' (no compression), 'zstd' (Zstandard), 'lz4' (LZ4). Note that compression may add CPU overhead but can provide substantial memory savings especially for datasets with high compression ratios.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.compression.zstd.level",
    "defaultValue": "3",
    "meaning": "Compression level for Zstandard (zstd) codec when compressing Arrow IPC data. This config is only used when spark.sql.execution.arrow.compression.codec is set to 'zstd'. Negative values provide ultra-fast compression with lower compression ratios. Positive values provide normal to maximum compression, with higher values giving better compression but slower speed. The default value 3 provides a good balance between compression speed and compression ratio.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.enabled",
    "defaultValue": "false",
    "meaning": "(Deprecated since Spark 3.0, please set 'spark.sql.execution.arrow.pyspark.enabled'.)",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.fallback.enabled",
    "defaultValue": "true",
    "meaning": "(Deprecated since Spark 3.0, please set 'spark.sql.execution.arrow.pyspark.fallback.enabled'.)",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.localRelationThreshold",
    "defaultValue": "48MB",
    "meaning": "When converting Arrow batches to Spark DataFrame, local collections are used in the driver side if the byte size of Arrow batches is smaller than this threshold. Otherwise, the Arrow batches are sent and deserialized to Spark internal rows in the executors.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.maxRecordsPerBatch",
    "defaultValue": "10000",
    "meaning": "When using Apache Arrow, limit the maximum number of records that can be written to a single ArrowRecordBatch in memory. If set to zero or negative there is no limit. See also spark.sql.execution.arrow.maxBytesPerBatch. If both are set, each batch is created when any condition of both is met.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.pyspark.enabled",
    "defaultValue": "(value ofspark.sql.execution.arrow.enabled)",
    "meaning": "When true, make use of Apache Arrow for columnar data transfers in PySpark. This optimization applies to: 1. pyspark.sql.DataFrame.toPandas. 2. pyspark.sql.SparkSession.createDataFrame when its input is a Pandas DataFrame or a NumPy ndarray. The following data type is unsupported: ArrayType of TimestampType.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.pyspark.fallback.enabled",
    "defaultValue": "(value ofspark.sql.execution.arrow.fallback.enabled)",
    "meaning": "When true, optimizations enabled by 'spark.sql.execution.arrow.pyspark.enabled' will fallback automatically to non-optimized implementations if an error occurs.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.pyspark.selfDestruct.enabled",
    "defaultValue": "false",
    "meaning": "(Experimental) When true, make use of Apache Arrow's self-destruct and split-blocks options for columnar data transfers in PySpark, when converting from Arrow to Pandas. This reduces memory usage at the cost of some CPU time. This optimization applies to: pyspark.sql.DataFrame.toPandas when 'spark.sql.execution.arrow.pyspark.enabled' is set.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.pyspark.validateSchema.enabled",
    "defaultValue": "false",
    "meaning": "When true, validate the schema of Arrow batches returned by mapInArrow, mapInPandas and DataSource against the expected schema to ensure that they are compatible.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.sparkr.enabled",
    "defaultValue": "false",
    "meaning": "When true, make use of Apache Arrow for columnar data transfers in SparkR. This optimization applies to: 1. createDataFrame when its input is an R DataFrame 2. collect 3. dapply 4. gapply The following data types are unsupported: FloatType, BinaryType, ArrayType, StructType and MapType.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.transformWithStateInPySpark.maxStateRecordsPerBatch",
    "defaultValue": "10000",
    "meaning": "When using TransformWithState in PySpark (both Python Row and Pandas), limit the maximum number of state records that can be written to a single ArrowRecordBatch in memory.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.arrow.useLargeVarTypes",
    "defaultValue": "false",
    "meaning": "When using Apache Arrow, use large variable width vectors for string and binary types. Regular string and binary types have a 2GiB limit for a column in a single record batch. Large variable types remove this limitation at the cost of higher memory usage per value.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.execution.interruptOnCancel",
    "defaultValue": "true",
    "meaning": "When true, all running tasks will be interrupted if one cancels a query.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pandas.inferPandasDictAsMap",
    "defaultValue": "false",
    "meaning": "When true, spark.createDataFrame will infer dict from Pandas DataFrame as a MapType. When false, spark.createDataFrame infers dict from Pandas DataFrame as a StructType which is default inferring from PyArrow.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pandas.structHandlingMode",
    "defaultValue": "legacy",
    "meaning": "\"The conversion mode of struct type when creating pandas DataFrame. When \"\"legacy\"\", 1. when Arrow optimization is disabled, convert to Row object, 2. when Arrow optimization is enabled, convert to dict or raise an Exception if there are duplicated nested field names. When \"\"row\"\", convert to Row object regardless of Arrow optimization. When \"\"dict\"\", convert to dict and use suffixed key names, e.g., a_0, a_1, if there are duplicated nested field names, regardless of Arrow optimization.\"",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.execution.pandas.udf.buffer.size",
    "defaultValue": "(value ofspark.buffer.size)",
    "meaning": "Same asspark.buffer.sizebut only applies to Pandas UDF executions. If it is not set, the fallback isspark.buffer.size. Note that Pandas execution requires more than 4 bytes. Lowering this value could make small Pandas UDF batch iterated and pipelined; however, it might degrade performance. See SPARK-27870.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.binaryAsBytes",
    "defaultValue": "true",
    "meaning": "When true, BinaryType is consistently mapped to bytes in PySpark. When false, restores the PySpark behavior before 4.1.0. Before 4.1.0, BinaryType is mapped to bytearray for regular UDF and UDTF without Arrow optimization, DataFrame APIs (both Spark Classic and Spark Connect), and data sources; BinaryType is mapped to bytes for Arrow-optimized UDF and UDTF with legacy pandas conversion.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.daemonKillWorkerOnFlushFailure",
    "defaultValue": "(value ofspark.python.daemon.killWorkerOnFlushFailure)",
    "meaning": "Same as spark.python.daemon.killWorkerOnFlushFailure for Python execution with DataFrame and SQL. It can change during runtime.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.faulthandler.enabled",
    "defaultValue": "(value ofspark.python.worker.faulthandler.enabled)",
    "meaning": "Same as spark.python.worker.faulthandler.enabled for Python execution with DataFrame and SQL. It can change during runtime.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.hideTraceback.enabled",
    "defaultValue": "false",
    "meaning": "When true, only show the message of the exception from Python UDFs, hiding the stack trace. If this is enabled, simplifiedTraceback has no effect.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.idleTimeoutSeconds",
    "defaultValue": "(value ofspark.python.worker.idleTimeoutSeconds)",
    "meaning": "Same as spark.python.worker.idleTimeoutSeconds for Python execution with DataFrame and SQL. It can change during runtime.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.killOnIdleTimeout",
    "defaultValue": "(value ofspark.python.worker.killOnIdleTimeout)",
    "meaning": "Same as spark.python.worker.killOnIdleTimeout for Python execution with DataFrame and SQL. It can change during runtime.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.simplifiedTraceback.enabled",
    "defaultValue": "true",
    "meaning": "When true, the traceback from Python UDFs is simplified. It hides the Python worker, (de)serialization, etc from PySpark in tracebacks, and only shows the exception messages from UDFs. Note that this works only with CPython 3.7+.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.execution.pyspark.udf.tracebackDumpIntervalSeconds",
    "defaultValue": "(value ofspark.python.worker.tracebackDumpIntervalSeconds)",
    "meaning": "Same as spark.python.worker.tracebackDumpIntervalSeconds for Python execution with DataFrame and SQL. It can change during runtime.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.python.udf.buffer.size",
    "defaultValue": "(value ofspark.buffer.size)",
    "meaning": "Same asspark.buffer.sizebut only applies to Python UDF executions. If it is not set, the fallback isspark.buffer.size.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.python.udf.maxRecordsPerBatch",
    "defaultValue": "100",
    "meaning": "When using Python UDFs, limit the maximum number of records that can be batched for serialization/deserialization.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pythonUDF.arrow.concurrency.level",
    "defaultValue": "(none)",
    "meaning": "The level of concurrency to execute Arrow-optimized Python UDF. This can be useful if Python UDFs use I/O intensively.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.execution.pythonUDF.arrow.enabled",
    "defaultValue": "false",
    "meaning": "Enable Arrow optimization in regular Python UDFs. This optimization can only be enabled when the given function takes at least one argument.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.execution.pythonUDF.pandas.intToDecimalCoercionEnabled",
    "defaultValue": "false",
    "meaning": "When true, convert int to Decimal python objects before converting Pandas.Series to Arrow array during serialization.Disabled by default, impacts performance.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.execution.pythonUDTF.arrow.enabled",
    "defaultValue": "false",
    "meaning": "Enable Arrow optimization for Python UDTFs.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.execution.topKSortFallbackThreshold",
    "defaultValue": "2147483632",
    "meaning": "In SQL queries with a SORT followed by a LIMIT like 'SELECT x FROM t ORDER BY y LIMIT m', if m is under this threshold, do a top-K sort in memory, otherwise do a global sort which spills to disk if necessary.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.extendedExplainProviders",
    "defaultValue": "(none)",
    "meaning": "A comma-separated list of classes that implement the org.apache.spark.sql.ExtendedExplainGenerator trait. If provided, Spark will print extended plan information from the providers in explain plan and in the UI",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.files.ignoreCorruptFiles",
    "defaultValue": "false",
    "meaning": "Whether to ignore corrupt files. If true, the Spark jobs will continue to run when encountering corrupted files and the contents that have been read will still be returned. This configuration is effective only when using file-based sources such as Parquet, JSON and ORC.",
    "sinceVersion": "2.1.1"
  },
  {
    "propertyName": "spark.sql.files.ignoreInvalidPartitionPaths",
    "defaultValue": "false",
    "meaning": "Whether to ignore invalid partition paths that do not match <column>=<value>. When the option is enabled, table with two partition directories 'table/invalid' and 'table/col=1' will only load the latter directory and ignore the invalid partition",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.files.ignoreMissingFiles",
    "defaultValue": "false",
    "meaning": "Whether to ignore missing files. If true, the Spark jobs will continue to run when encountering missing files and the contents that have been read will still be returned. This configuration is effective only when using file-based sources such as Parquet, JSON and ORC.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.files.maxPartitionBytes",
    "defaultValue": "128MB",
    "meaning": "The maximum number of bytes to pack into a single partition when reading files. This configuration is effective only when using file-based sources such as Parquet, JSON and ORC.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.files.maxPartitionNum",
    "defaultValue": "(none)",
    "meaning": "The suggested (not guaranteed) maximum number of split file partitions. If it is set, Spark will rescale each partition to make the number of partitions is close to this value if the initial number of partitions exceeds this value. This configuration is effective only when using file-based sources such as Parquet, JSON and ORC.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.files.maxRecordsPerFile",
    "defaultValue": "0",
    "meaning": "Maximum number of records to write out to a single file. If this value is zero or negative, there is no limit.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.files.minPartitionNum",
    "defaultValue": "(none)",
    "meaning": "The suggested (not guaranteed) minimum number of split file partitions. If not set, the default value isspark.sql.leafNodeDefaultParallelism. This configuration is effective only when using file-based sources such as Parquet, JSON and ORC.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.function.concatBinaryAsString",
    "defaultValue": "false",
    "meaning": "When this option is set to false and all inputs are binary,functions.concatreturns an output as binary. Otherwise, it returns as a string.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.function.eltOutputAsString",
    "defaultValue": "false",
    "meaning": "When this option is set to false and all inputs are binary,eltreturns an output as binary. Otherwise, it returns as a string.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.geospatial.enabled",
    "defaultValue": "false",
    "meaning": "When true, enables geospatial types (GEOGRAPHY/GEOMETRY) and ST functions.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.groupByAliases",
    "defaultValue": "true",
    "meaning": "When true, aliases in a select list can be used in group by clauses. When false, an analysis exception is thrown in the case.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.groupByOrdinal",
    "defaultValue": "true",
    "meaning": "When true, the ordinal numbers in group by clauses are treated as the position in the select list. When false, the ordinal numbers are ignored.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.hive.convertInsertingPartitionedTable",
    "defaultValue": "true",
    "meaning": "When set to true, andspark.sql.hive.convertMetastoreParquetorspark.sql.hive.convertMetastoreOrcis true, the built-in ORC/Parquet writer is usedto process inserting into partitioned ORC/Parquet tables created by using the HiveSQL syntax.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.hive.convertInsertingUnpartitionedTable",
    "defaultValue": "true",
    "meaning": "When set to true, andspark.sql.hive.convertMetastoreParquetorspark.sql.hive.convertMetastoreOrcis true, the built-in ORC/Parquet writer is usedto process inserting into unpartitioned ORC/Parquet tables created by using the HiveSQL syntax.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.hive.convertMetastoreAsNullable",
    "defaultValue": "false",
    "meaning": "When set to true, apply nullable to the schema when Spark use datasource APIs instead of Hive serde to read/write Hive tables in Parquet or ORC formats. This flag is effective only ifconvertMetastoreParquetorconvertMetastoreOrcis enabled respectively. It's recommended to set to true, when the nullability of table schema is inconsistent between the metastore and the data files.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.hive.convertMetastoreCtas",
    "defaultValue": "true",
    "meaning": "When set to true, Spark will try to use built-in data source writer instead of Hive serde in CTAS. This flag is effective only ifspark.sql.hive.convertMetastoreParquetorspark.sql.hive.convertMetastoreOrcis enabled respectively for Parquet and ORC formats",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.hive.convertMetastoreInsertDir",
    "defaultValue": "true",
    "meaning": "When set to true, Spark will try to use built-in data source writer instead of Hive serde in INSERT OVERWRITE DIRECTORY. This flag is effective only ifspark.sql.hive.convertMetastoreParquetorspark.sql.hive.convertMetastoreOrcis enabled respectively for Parquet and ORC formats",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.hive.convertMetastoreOrc",
    "defaultValue": "true",
    "meaning": "When set to true, the built-in ORC reader and writer are used to process ORC tables created by using the HiveQL syntax, instead of Hive serde.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.hive.convertMetastoreParquet",
    "defaultValue": "true",
    "meaning": "When set to true, the built-in Parquet reader and writer are used to process parquet tables created by using the HiveQL syntax, instead of Hive serde.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.sql.hive.convertMetastoreParquet.mergeSchema",
    "defaultValue": "false",
    "meaning": "\"When true, also tries to merge possibly different but compatible Parquet schemas in different Parquet data files. This configuration is only effective when \"\"spark.sql.hive.convertMetastoreParquet\"\" is true.\"",
    "sinceVersion": "1.3.1"
  },
  {
    "propertyName": "spark.sql.hive.dropPartitionByName.enabled",
    "defaultValue": "false",
    "meaning": "When true, Spark will get partition name rather than partition object to drop partition, which can improve the performance of drop partition.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.hive.filesourcePartitionFileCacheSize",
    "defaultValue": "262144000",
    "meaning": "When nonzero, enable caching of partition file metadata in memory. All tables share a cache that can use up to specified num bytes for file metadata. This conf only has an effect when hive filesource partition management is enabled.",
    "sinceVersion": "2.1.1"
  },
  {
    "propertyName": "spark.sql.hive.manageFilesourcePartitions",
    "defaultValue": "true",
    "meaning": "When true, enable metastore partition management for file source tables as well. This includes both datasource and converted Hive tables. When partition management is enabled, datasource tables store partition in the Hive metastore, and use the metastore to prune partitions during query planning when spark.sql.hive.metastorePartitionPruning is set to true.",
    "sinceVersion": "2.1.1"
  },
  {
    "propertyName": "spark.sql.hive.metastorePartitionPruning",
    "defaultValue": "true",
    "meaning": "When true, some predicates will be pushed down into the Hive metastore so that unmatching partitions can be eliminated earlier.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.hive.metastorePartitionPruningFallbackOnException",
    "defaultValue": "false",
    "meaning": "Whether to fallback to get all partitions from Hive metastore and perform partition pruning on Spark client side, when encountering MetaException from the metastore. Note that Spark query performance may degrade if this is enabled and there are many partitions to be listed. If this is disabled, Spark will fail the query instead.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.hive.metastorePartitionPruningFastFallback",
    "defaultValue": "false",
    "meaning": "When this config is enabled, if the predicates are not supported by Hive or Spark does fallback due to encountering MetaException from the metastore, Spark will instead prune partitions by getting the partition names first and then evaluating the filter expressions on the client side. Note that the predicates with TimeZoneAwareExpression is not supported.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.hive.thriftServer.async",
    "defaultValue": "true",
    "meaning": "When set to true, Hive Thrift server executes SQL queries in an asynchronous way.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.icu.caseMappings.enabled",
    "defaultValue": "true",
    "meaning": "When enabled we use the ICU library (instead of the JVM) to implement case mappings for strings under UTF8_BINARY collation.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.inMemoryColumnarStorage.batchSize",
    "defaultValue": "10000",
    "meaning": "Controls the size of batches for columnar caching. Larger batch sizes can improve memory utilization and compression, but risk OOMs when caching data.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.sql.inMemoryColumnarStorage.compressed",
    "defaultValue": "true",
    "meaning": "When set to true Spark SQL will automatically select a compression codec for each column based on statistics of the data.",
    "sinceVersion": "1.0.1"
  },
  {
    "propertyName": "spark.sql.inMemoryColumnarStorage.enableVectorizedReader",
    "defaultValue": "true",
    "meaning": "Enables vectorized reader for columnar caching.",
    "sinceVersion": "2.3.1"
  },
  {
    "propertyName": "spark.sql.inMemoryColumnarStorage.hugeVectorReserveRatio",
    "defaultValue": "1.2",
    "meaning": "When spark.sql.inMemoryColumnarStorage.hugeVectorThreshold <= 0 or the required memory is smaller than spark.sql.inMemoryColumnarStorage.hugeVectorThreshold, spark reserves required memory * 2 memory; otherwise, spark reserves required memory * this ratio memory, and will release this column vector memory before reading the next batch rows.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.inMemoryColumnarStorage.hugeVectorThreshold",
    "defaultValue": "-1b",
    "meaning": "When the required memory is larger than this, spark reserves required memory * spark.sql.inMemoryColumnarStorage.hugeVectorReserveRatio memory next time and release this column vector memory before reading the next batch rows. -1 means disabling the optimization.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.json.filterPushdown.enabled",
    "defaultValue": "true",
    "meaning": "When true, enable filter pushdown to JSON datasource.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.json.useUnsafeRow",
    "defaultValue": "false",
    "meaning": "When set to true, use UnsafeRow to represent struct result in the JSON parser. It can be overwritten by the JSON optionuseUnsafeRow.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.jsonGenerator.ignoreNullFields",
    "defaultValue": "true",
    "meaning": "Whether to ignore null fields when generating JSON objects in JSON data source and JSON functions such as to_json. If false, it generates null for null fields in JSON objects.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.leafNodeDefaultParallelism",
    "defaultValue": "(none)",
    "meaning": "The default parallelism of Spark SQL leaf nodes that produce data, such as the file scan node, the local data scan node, the range node, etc. The default value of this config is 'SparkContext#defaultParallelism'.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.legacy.hive.thriftServer.useZeroBasedColumnOrdinalPosition",
    "defaultValue": "false",
    "meaning": "When set to true, Hive Thrift server returns 0-based ORDINAL_POSITION in the result of GetColumns operation, instead of the corrected 1-based.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.mapKeyDedupPolicy",
    "defaultValue": "EXCEPTION",
    "meaning": "The policy to deduplicate map keys in builtin function: CreateMap, MapFromArrays, MapFromEntries, StringToMap, MapConcat and TransformKeys. When EXCEPTION, the query fails if duplicated map keys are detected. When LAST_WIN, the map key that is inserted at last takes precedence.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.mapZipWithUsesJavaCollections",
    "defaultValue": "true",
    "meaning": "When true, themap_zip_withfunction uses Java collections instead of Scala collections. This is useful for avoiding NaN equality issues.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.maven.additionalRemoteRepositories",
    "defaultValue": "https://maven-central.storage-download.googleapis.com/maven2/",
    "meaning": "A comma-delimited string config of the optional additional remote Maven mirror repositories. This is only used for downloading Hive jars in IsolatedClientLoader if the default Maven Central repo is unreachable.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.maxBroadcastTableSize",
    "defaultValue": "8589934592b",
    "meaning": "The maximum table size in bytes that can be broadcast in broadcast joins.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.maxMetadataStringLength",
    "defaultValue": "100",
    "meaning": "Maximum number of characters to output for a metadata string. e.g. file location inDataSourceScanExec, every value will be abbreviated if exceed length.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.maxPlanStringLength",
    "defaultValue": "2147483632",
    "meaning": "Maximum number of characters to output for a plan string. If the plan is longer, further output will be truncated. The default setting always generates a full plan. Set this to a lower value such as 8k if plan strings are taking up too much memory or are causing OutOfMemory errors in the driver or UI processes.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.maxSinglePartitionBytes",
    "defaultValue": "128m",
    "meaning": "The maximum number of bytes allowed for a single partition. Otherwise, The planner will introduce shuffle to improve parallelism.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.operatorPipeSyntaxEnabled",
    "defaultValue": "true",
    "meaning": "\"If true, enable operator pipe syntax for Apache Spark SQL. This uses the operator pipe marker",
    "sinceVersion": "> to indicate separation between clauses of SQL in a manner that describes the sequence of steps that the query performs in a composable fashion.\""
  },
  {
    "propertyName": "spark.sql.optimizer.avoidCollapseUDFWithExpensiveExpr",
    "defaultValue": "true",
    "meaning": "Whether to avoid collapsing projections that would duplicate expensive expressions in UDFs.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.optimizer.collapseProjectAlwaysInline",
    "defaultValue": "false",
    "meaning": "Whether to always collapse two adjacent projections and inline expressions even if it causes extra duplication.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.dynamicPartitionPruning.enabled",
    "defaultValue": "true",
    "meaning": "When true, we will generate predicate for partition column when it's used as join key",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.optimizer.enableCsvExpressionOptimization",
    "defaultValue": "true",
    "meaning": "Whether to optimize CSV expressions in SQL optimizer. It includes pruning unnecessary columns from from_csv.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.optimizer.enableJsonExpressionOptimization",
    "defaultValue": "true",
    "meaning": "Whether to optimize JSON expressions in SQL optimizer. It includes pruning unnecessary columns from from_json, simplifying from_json + to_json, to_json + named_struct(from_json.col1, from_json.col2, ....).",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.optimizer.excludedRules",
    "defaultValue": "(none)",
    "meaning": "Configures a list of rules to be disabled in the optimizer, in which the rules are specified by their rule names and separated by comma. It is not guaranteed that all the rules in this configuration will eventually be excluded, as some rules are necessary for correctness. The optimizer will log the rules that have indeed been excluded.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.applicationSideScanSizeThreshold",
    "defaultValue": "10GB",
    "meaning": "Byte size threshold of the Bloom filter application side plan's aggregated scan size. Aggregated scan byte size of the Bloom filter application side needs to be over this value to inject a bloom filter.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.creationSideThreshold",
    "defaultValue": "10MB",
    "meaning": "Size threshold of the bloom filter creation side plan. Estimated size needs to be under this value to try to inject bloom filter.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.enabled",
    "defaultValue": "true",
    "meaning": "When true and if one side of a shuffle join has a selective predicate, we attempt to insert a bloom filter in the other side to reduce the amount of shuffle data.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.expectedNumItems",
    "defaultValue": "1000000",
    "meaning": "The default number of expected items for the runtime bloomfilter",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.maxNumBits",
    "defaultValue": "67108864",
    "meaning": "The max number of bits to use for the runtime bloom filter",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.maxNumItems",
    "defaultValue": "4000000",
    "meaning": "The max allowed number of expected items for the runtime bloom filter",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.bloomFilter.numBits",
    "defaultValue": "8388608",
    "meaning": "The default number of bits to use for the runtime bloom filter",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtime.rowLevelOperationGroupFilter.enabled",
    "defaultValue": "true",
    "meaning": "Enables runtime group filtering for group-based row-level operations. Data sources that replace groups of data (e.g. files, partitions) may prune entire groups using provided data source filters when planning a row-level operation scan. However, such filtering is limited as not all expressions can be converted into data source filters and some expressions can only be evaluated by Spark (e.g. subqueries). Since rewriting groups is expensive, Spark can execute a query at runtime to find what records match the condition of the row-level operation. The information about matching records will be passed back to the row-level operation scan, allowing data sources to discard groups that don't have to be rewritten.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.optimizer.runtimeFilter.number.threshold",
    "defaultValue": "10",
    "meaning": "The total number of injected runtime filters (non-DPP) for a single query. This is to prevent driver OOMs with too many Bloom filters.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.orc.aggregatePushdown",
    "defaultValue": "false",
    "meaning": "If true, aggregates will be pushed down to ORC for optimization. Support MIN, MAX and COUNT as aggregate expression. For MIN/MAX, support boolean, integer, float and date type. For COUNT, support all data types. If statistics is missing from any ORC file footer, exception would be thrown.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.orc.columnarReaderBatchSize",
    "defaultValue": "4096",
    "meaning": "The number of rows to include in a orc vectorized reader batch. The number should be carefully chosen to minimize overhead and avoid OOMs in reading data.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.orc.columnarWriterBatchSize",
    "defaultValue": "1024",
    "meaning": "The number of rows to include in a orc vectorized writer batch. The number should be carefully chosen to minimize overhead and avoid OOMs in writing data.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.orc.compression.codec",
    "defaultValue": "zstd",
    "meaning": "Sets the compression codec used when writing ORC files. If eithercompressionororc.compressis specified in the table-specific options/properties, the precedence would becompression,orc.compress,spark.sql.orc.compression.codec. Acceptable values include: none, uncompressed, snappy, zlib, lzo, zstd, lz4, brotli.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.orc.enableNestedColumnVectorizedReader",
    "defaultValue": "true",
    "meaning": "Enables vectorized orc decoding for nested column.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.orc.enableVectorizedReader",
    "defaultValue": "true",
    "meaning": "Enables vectorized orc decoding.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.orc.filterPushdown",
    "defaultValue": "true",
    "meaning": "When true, enable filter pushdown for ORC files.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.orc.mergeSchema",
    "defaultValue": "false",
    "meaning": "When true, the Orc data source merges schemas collected from all data files, otherwise the schema is picked from a random data file.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.orderByOrdinal",
    "defaultValue": "true",
    "meaning": "When true, the ordinal numbers are treated as the position in the select list. When false, the ordinal numbers in order/sort by clause are ignored.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.parquet.aggregatePushdown",
    "defaultValue": "false",
    "meaning": "If true, aggregates will be pushed down to Parquet for optimization. Support MIN, MAX and COUNT as aggregate expression. For MIN/MAX, support boolean, integer, float and date type. For COUNT, support all data types. If statistics is missing from any Parquet file footer, exception would be thrown.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.binaryAsString",
    "defaultValue": "false",
    "meaning": "Some other Parquet-producing systems, in particular Impala and older versions of Spark SQL, do not differentiate between binary data and strings when writing out the Parquet schema. This flag tells Spark SQL to interpret binary data as a string to provide compatibility with these systems.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.sql.parquet.columnarReaderBatchSize",
    "defaultValue": "4096",
    "meaning": "The number of rows to include in a parquet vectorized reader batch. The number should be carefully chosen to minimize overhead and avoid OOMs in reading data.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.parquet.compression.codec",
    "defaultValue": "snappy",
    "meaning": "Sets the compression codec used when writing Parquet files. If eithercompressionorparquet.compressionis specified in the table-specific options/properties, the precedence would becompression,parquet.compression,spark.sql.parquet.compression.codec. Acceptable values include: none, uncompressed, snappy, gzip, lzo, brotli, lz4, lz4_raw, zstd.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.sql.parquet.enableNestedColumnVectorizedReader",
    "defaultValue": "true",
    "meaning": "Enables vectorized Parquet decoding for nested columns (e.g., struct, list, map). Requires spark.sql.parquet.enableVectorizedReader to be enabled.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.enableNullTypeVectorizedReader",
    "defaultValue": "true",
    "meaning": "Enables vectorized Parquet reader support for NullType columns.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.parquet.enableVectorizedReader",
    "defaultValue": "true",
    "meaning": "Enables vectorized parquet decoding.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.parquet.fieldId.read.enabled",
    "defaultValue": "false",
    "meaning": "Field ID is a native field of the Parquet schema spec. When enabled, Parquet readers will use field IDs (if present) in the requested Spark schema to look up Parquet fields instead of using column names",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.fieldId.read.ignoreMissing",
    "defaultValue": "false",
    "meaning": "When the Parquet file doesn't have any field IDs but the Spark read schema is using field IDs to read, we will silently return nulls when this flag is enabled, or error otherwise.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.fieldId.write.enabled",
    "defaultValue": "true",
    "meaning": "Field ID is a native field of the Parquet schema spec. When enabled, Parquet writers will populate the field Id metadata (if present) in the Spark schema to the Parquet schema.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.filterPushdown",
    "defaultValue": "true",
    "meaning": "Enables Parquet filter push-down optimization when set to true.",
    "sinceVersion": "1.2.0"
  },
  {
    "propertyName": "spark.sql.parquet.inferTimestampNTZ.enabled",
    "defaultValue": "true",
    "meaning": "When enabled, Parquet timestamp columns with annotation isAdjustedToUTC = false are inferred as TIMESTAMP_NTZ type during schema inference. Otherwise, all the Parquet timestamp columns are inferred as TIMESTAMP_LTZ types. Note that Spark writes the output schema into Parquet's footer metadata on file writing and leverages it on file reading. Thus this configuration only affects the schema inference on Parquet files which are not written by Spark.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.parquet.int96AsTimestamp",
    "defaultValue": "true",
    "meaning": "Some Parquet-producing systems, in particular Impala, store Timestamp into INT96. Spark would also store Timestamp as INT96 because we need to avoid precision lost of the nanoseconds field. This flag tells Spark SQL to interpret INT96 data as a timestamp to provide compatibility with these systems.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.int96TimestampConversion",
    "defaultValue": "false",
    "meaning": "This controls whether timestamp adjustments should be applied to INT96 data when converting to timestamps, for data written by Impala. This is necessary because Impala stores INT96 data with a different timezone offset than Hive & Spark.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.mergeSchema",
    "defaultValue": "false",
    "meaning": "When true, the Parquet data source merges schemas collected from all data files, otherwise the schema is picked from the summary file or a random data file if no summary file is available.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.parquet.outputTimestampType",
    "defaultValue": "INT96",
    "meaning": "Sets which Parquet timestamp type to use when Spark writes data to Parquet files. INT96 is a non-standard but commonly used timestamp type in Parquet. TIMESTAMP_MICROS is a standard timestamp type in Parquet, which stores number of microseconds from the Unix epoch. TIMESTAMP_MILLIS is also standard, but with millisecond precision, which means Spark has to truncate the microsecond portion of its timestamp value.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.recordLevelFilter.enabled",
    "defaultValue": "false",
    "meaning": "If true, enables Parquet's native record-level filtering using the pushed down filters. This configuration only has an effect when 'spark.sql.parquet.filterPushdown' is enabled and the vectorized reader is not used. You can ensure the vectorized reader is not used by setting 'spark.sql.parquet.enableVectorizedReader' to false.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.parquet.respectSummaryFiles",
    "defaultValue": "false",
    "meaning": "When true, we make assumption that all part-files of Parquet are consistent with summary files and we will ignore them when merging schema. Otherwise, if this is false, which is the default, we will merge all part-files. This should be considered as expert-only option, and shouldn't be enabled before knowing what it means exactly.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.parquet.variant.annotateLogicalType.enabled",
    "defaultValue": "true",
    "meaning": "When enabled, Spark annotates the variant groups written to Parquet as the parquet variant logical type.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.parquet.writeLegacyFormat",
    "defaultValue": "false",
    "meaning": "If true, data will be written in a way of Spark 1.4 and earlier. For example, decimal values will be written in Apache Parquet's fixed-length byte array format, which other systems such as Apache Hive and Apache Impala use. If false, the newer format in Parquet will be used. For example, decimals will be written in int-based format. If Parquet output is intended for use with systems that do not support this newer format, set to true.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.sql.parser.quotedRegexColumnNames",
    "defaultValue": "false",
    "meaning": "When true, quoted Identifiers (using backticks) in SELECT statement are interpreted as regular expressions.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.pipelines.maxFlowRetryAttempts",
    "defaultValue": "2",
    "meaning": "Maximum number of times a flow can be retried",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.pivotMaxValues",
    "defaultValue": "10000",
    "meaning": "When doing a pivot without specifying values for the pivot column this is the maximum number of (distinct) values that will be collected without error.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.sql.planner.pythonExecution.memory",
    "defaultValue": "(none)",
    "meaning": "Specifies the memory allocation for executing Python code in Spark driver, in MiB. When set, it caps the memory for Python execution to the specified amount. If not set, Spark will not limit Python's memory usage and it is up to the application to avoid exceeding the overhead memory space shared with other non-JVM processes. Note: Windows does not support resource limiting and actual resource is not limited on MacOS.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.preserveCharVarcharTypeInfo",
    "defaultValue": "false",
    "meaning": "When true, Spark does not replace CHAR/VARCHAR types the STRING type, which is the default behavior of Spark 3.0 and earlier versions. This means the length checks for CHAR/VARCHAR types is enforced and CHAR type is also properly padded.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.pyspark.inferNestedDictAsStruct.enabled",
    "defaultValue": "false",
    "meaning": "PySpark's SparkSession.createDataFrame infers the nested dict as a map by default. When it set to true, it infers the nested dict as a struct.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.pyspark.jvmStacktrace.enabled",
    "defaultValue": "false",
    "meaning": "When true, it shows the JVM stacktrace in the user-facing PySpark exception together with Python stacktrace. By default, it is disabled to hide JVM stacktrace and shows a Python-friendly exception only. Note that this is independent from log level settings.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.pyspark.plotting.max_rows",
    "defaultValue": "1000",
    "meaning": "The visual limit on plots. If set to 1000 for top-n-based plots (pie, bar, barh), the first 1000 data points will be used for plotting. For sampled-based plots (scatter, area, line), 1000 data points will be randomly sampled.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.pyspark.udf.profiler",
    "defaultValue": "(none)",
    "meaning": "\"Configure the Python/Pandas UDF profiler by enabling or disabling it with the option to choose between \"\"perf\"\" and \"\"memory\"\" types, or unsetting the config disables the profiler. This is disabled by default.\"",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.pyspark.worker.logging.enabled",
    "defaultValue": "false",
    "meaning": "When set to true, this configuration enables comprehensive logging within Python worker processes that execute User-Defined Functions (UDFs), User-Defined Table Functions (UDTFs), and other Python-based operations in Spark SQL.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.python.filterPushdown.enabled",
    "defaultValue": "false",
    "meaning": "When true, enable filter pushdown to Python datasource, at the cost of running Python worker one additional time during planning.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.readSideCharPadding",
    "defaultValue": "true",
    "meaning": "When true, Spark applies string padding when reading CHAR type columns/fields, in addition to the write-side padding. This config is true by default to better enforce CHAR type semantic in cases such as external tables.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.redaction.options.regex",
    "defaultValue": "(?i)url",
    "meaning": "Regex to decide which keys in a Spark SQL command's options map contain sensitive information. The values of options whose names that match this regex will be redacted in the explain output. This redaction is applied on top of the global redaction configuration defined by spark.redaction.regex.",
    "sinceVersion": "2.2.2"
  },
  {
    "propertyName": "spark.sql.redaction.string.regex",
    "defaultValue": "(value ofspark.redaction.string.regex)",
    "meaning": "Regex to decide which parts of strings produced by Spark contain sensitive information. When this regex matches a string part, that string part is replaced by a dummy value. This is currently used to redact the output of SQL explain commands. When this conf is not set, the value fromspark.redaction.string.regexis used.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.repl.eagerEval.enabled",
    "defaultValue": "false",
    "meaning": "Enables eager evaluation or not. When true, the top K rows of Dataset will be displayed if and only if the REPL supports the eager evaluation. Currently, the eager evaluation is supported in PySpark and SparkR. In PySpark, for the notebooks like Jupyter, the HTML table (generated byrepr_html) will be returned. For plain Python REPL, the returned outputs are formatted like dataframe.show(). In SparkR, the returned outputs are showed similar to R data.frame would.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.repl.eagerEval.maxNumRows",
    "defaultValue": "20",
    "meaning": "The max number of rows that are returned by eager evaluation. This only takes effect when spark.sql.repl.eagerEval.enabled is set to true. The valid range of this config is from 0 to (Int.MaxValue - 1), so the invalid config like negative and greater than (Int.MaxValue - 1) will be normalized to 0 and (Int.MaxValue - 1).",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.repl.eagerEval.truncate",
    "defaultValue": "20",
    "meaning": "The max number of characters for each cell that is returned by eager evaluation. This only takes effect when spark.sql.repl.eagerEval.enabled is set to true.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.scripting.enabled",
    "defaultValue": "true",
    "meaning": "SQL Scripting feature is under development and its use should be done under this feature flag. SQL Scripting enables users to write procedural SQL including control flow and error handling.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.session.localRelationCacheThreshold",
    "defaultValue": "1048576",
    "meaning": "The threshold for the size in bytes of local relations to be cached at the driver side after serialization.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.session.localRelationChunkSizeBytes",
    "defaultValue": "16777216",
    "meaning": "The chunk size in bytes when splitting ChunkedCachedLocalRelation.data into batches. A new chunk is created when either spark.sql.session.localRelationChunkSizeBytes or spark.sql.session.localRelationChunkSizeRows is reached. Limited by the spark.sql.session.localRelationBatchOfChunksSizeBytes, a minimum of the two confs is used to determine the chunk size.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.session.localRelationChunkSizeRows",
    "defaultValue": "10000",
    "meaning": "The chunk size in number of rows when splitting ChunkedCachedLocalRelation.data into batches. A new chunk is created when either spark.sql.session.localRelationChunkSizeBytes or spark.sql.session.localRelationChunkSizeRows is reached.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.session.timeZone",
    "defaultValue": "(value of local timezone)",
    "meaning": "\"The ID of session local timezone in the format of either region-based zone IDs or zone offsets. Region IDs must have the form 'area/city', such as 'America/Los_Angeles'. Zone offsets must be in the format '(+",
    "sinceVersion": "-)HH', '(+"
  },
  {
    "propertyName": "spark.sql.shuffle.orderIndependentChecksum.enableFullRetryOnMismatch",
    "defaultValue": "false",
    "meaning": "Whether to retry all tasks of a consumer stage when we detect checksum mismatches with its producer stages.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.shuffle.orderIndependentChecksum.enabled",
    "defaultValue": "false",
    "meaning": "Whether to calculate order independent checksum for the shuffle data or not. If enabled, Spark will calculate a checksum that is independent of the input row order for each mapper and returns the checksums from executors to driver. This is different from the checksum computed when spark.shuffle.checksum.enabled is enabled which is sensitive to shuffle data ordering to detect file corruption. While this checksum will be the same even if the shuffle row order changes and it is used to detect whether different task attempts of the same partition produce different output data or not (same set of keyValue pairs). In case the output data has changed across retries, Spark will need to retry all tasks of the consumer stages to avoid correctness issues.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.shuffle.partitions",
    "defaultValue": "200",
    "meaning": "The default number of partitions to use when shuffling data for joins or aggregations.",
    "sinceVersion": "1.1.0"
  },
  {
    "propertyName": "spark.sql.shuffleDependency.fileCleanup.enabled",
    "defaultValue": "false",
    "meaning": "(Deprecated since Spark 4.1, please set 'spark.sql.connect.shuffleDependency.fileCleanup.enabled'.)",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.shuffleDependency.skipMigration.enabled",
    "defaultValue": "false",
    "meaning": "When enabled, shuffle dependencies for a Spark Connect SQL execution are marked at the end of the execution, and they will not be migrated during decommissions.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.shuffledHashJoinFactor",
    "defaultValue": "3",
    "meaning": "The shuffle hash join can be selected if the data size of small side multiplied by this factor is still smaller than the large side.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.sources.bucketing.autoBucketedScan.enabled",
    "defaultValue": "true",
    "meaning": "When true, decide whether to do bucketed scan on input tables based on query plan automatically. Do not use bucketed scan if 1. query does not have operators to utilize bucketing (e.g. join, group-by, etc), or 2. there's an exchange operator between these operators and table scan. Note when 'spark.sql.sources.bucketing.enabled' is set to false, this configuration does not take any effect.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.sources.bucketing.enabled",
    "defaultValue": "true",
    "meaning": "When false, we will treat bucketed table as normal table",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.sources.bucketing.maxBuckets",
    "defaultValue": "100000",
    "meaning": "The maximum number of buckets allowed.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.sources.default",
    "defaultValue": "parquet",
    "meaning": "The default data source to use in input/output.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.sql.sources.parallelPartitionDiscovery.threshold",
    "defaultValue": "32",
    "meaning": "The maximum number of paths allowed for listing files at driver side. If the number of detected paths exceeds this value during partition discovery, it tries to list the files with another Spark distributed job. This configuration is effective only when using file-based sources such as Parquet, JSON and ORC.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.sources.partitionColumnTypeInference.enabled",
    "defaultValue": "true",
    "meaning": "When true, automatically infer the data types for partitioned columns.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.sources.partitionOverwriteMode",
    "defaultValue": "STATIC",
    "meaning": "\"When INSERT OVERWRITE a partitioned data source table, we currently support 2 modes: static and dynamic. In static mode, Spark deletes all the partitions that match the partition specification(e.g. PARTITION(a=1,b)) in the INSERT statement, before overwriting. In dynamic mode, Spark doesn't delete partitions ahead, and only overwrite those partitions that have data written into it at runtime. By default we use static mode to keep the same behavior of Spark prior to 2.3. Note that this config doesn't affect Hive serde tables, as they are always overwritten with dynamic mode. This can also be set as an output option for a data source using key partitionOverwriteMode (which takes precedence over this setting), e.g. dataframe.write.option(\"\"partitionOverwriteMode\"\", \"\"dynamic\"\").save(path).\"",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.allowCompatibleTransforms.enabled",
    "defaultValue": "false",
    "meaning": "Whether to allow storage-partition join in the case where the partition transforms are compatible but not identical. This config requires both spark.sql.sources.v2.bucketing.enabled and spark.sql.sources.v2.bucketing.pushPartValues.enabled to be enabled and spark.sql.sources.v2.bucketing.partiallyClusteredDistribution.enabled to be disabled.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.allowJoinKeysSubsetOfPartitionKeys.enabled",
    "defaultValue": "false",
    "meaning": "Whether to allow storage-partition join in the case where join keys are a subset of the partition keys of the source tables. At planning time, Spark will group the partitions by only those keys that are in the join keys. This is currently enabled only if spark.sql.requireAllClusterKeysForDistribution is false.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.enabled",
    "defaultValue": "true",
    "meaning": "Similar to spark.sql.sources.bucketing.enabled, this config is used to enable bucketing for V2 data sources. When turned on, Spark will recognize the specific distribution reported by a V2 data source through SupportsReportPartitioning, and will try to avoid shuffle if necessary.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.partiallyClusteredDistribution.enabled",
    "defaultValue": "false",
    "meaning": "During a storage-partitioned join, whether to allow input partitions to be partially clustered, when both sides of the join are of KeyGroupedPartitioning. At planning time, Spark will pick the side with less data size based on table statistics, group and replicate them to match the other side. This is an optimization on skew join and can help to reduce data skewness when certain partitions are assigned large amount of data. This config requires both spark.sql.sources.v2.bucketing.enabled and spark.sql.sources.v2.bucketing.pushPartValues.enabled to be enabled",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.partition.filter.enabled",
    "defaultValue": "false",
    "meaning": "Whether to filter partitions when running storage-partition join. When enabled, partitions without matches on the other side can be omitted for scanning, if allowed by the join type. This config requires both spark.sql.sources.v2.bucketing.enabled and spark.sql.sources.v2.bucketing.pushPartValues.enabled to be enabled.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.pushPartValues.enabled",
    "defaultValue": "true",
    "meaning": "Whether to pushdown common partition values when spark.sql.sources.v2.bucketing.enabled is enabled. When turned on, if both sides of a join are of KeyGroupedPartitioning and if they share compatible partition keys, even if they don't have the exact same partition values, Spark will calculate a superset of partition values and pushdown that info to scan nodes, which will use empty partitions for the missing partition values on either side. This could help to eliminate unnecessary shuffles",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.shuffle.enabled",
    "defaultValue": "false",
    "meaning": "During a storage-partitioned join, whether to allow to shuffle only one side. When only one side is KeyGroupedPartitioning, if the conditions are met, spark will only shuffle the other side. This optimization will reduce the amount of data that needs to be shuffle. This config requires spark.sql.sources.v2.bucketing.enabled to be enabled",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.sources.v2.bucketing.sorting.enabled",
    "defaultValue": "false",
    "meaning": "When turned on, Spark will recognize the specific distribution reported by a V2 data source through SupportsReportPartitioning, and will try to avoid a shuffle if possible when sorting by those columns. This config requires spark.sql.sources.v2.bucketing.enabled to be enabled.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.stackTracesInDataFrameContext",
    "defaultValue": "1",
    "meaning": "The number of non-Spark stack traces in the captured DataFrame query context.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.statistics.fallBackToHdfs",
    "defaultValue": "false",
    "meaning": "When true, it will fall back to HDFS if the table statistics are not available from table metadata. This is useful in determining if a table is small enough to use broadcast joins. This flag is effective only for non-partitioned Hive tables. For non-partitioned data source tables, it will be automatically recalculated if table statistics are not available. For partitioned data source and partitioned Hive tables, It is 'spark.sql.defaultSizeInBytes' if table statistics are not available.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.statistics.histogram.enabled",
    "defaultValue": "false",
    "meaning": "Generates histograms when computing column statistics if enabled. Histograms can provide better estimation accuracy. Currently, Spark only supports equi-height histogram. Note that collecting histograms takes extra cost. For example, collecting column statistics usually takes only one table scan, but generating equi-height histogram will cause an extra table scan.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.statistics.size.autoUpdate.enabled",
    "defaultValue": "false",
    "meaning": "Enables automatic update for table size once table's data is changed. Note that if the total number of files of the table is very large, this can be expensive and slow down data change commands.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.statistics.updatePartitionStatsInAnalyzeTable.enabled",
    "defaultValue": "false",
    "meaning": "When this config is enabled, Spark will also update partition statistics in analyze table command (i.e., ANALYZE TABLE .. COMPUTE STATISTICS [NOSCAN]). Note the command will also become more expensive. When this config is disabled, Spark will only update table level statistics.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.storeAssignmentPolicy",
    "defaultValue": "ANSI",
    "meaning": "When inserting a value into a column with different data type, Spark will perform type coercion. Currently, we support 3 policies for the type coercion rules: ANSI, legacy and strict. With ANSI policy, Spark performs the type coercion as per ANSI SQL. In practice, the behavior is mostly the same as PostgreSQL. It disallows certain unreasonable type conversions such as convertingstringtointordoubletoboolean. With legacy policy, Spark allows the type coercion as long as it is a validCast, which is very loose. e.g. convertingstringtointordoubletobooleanis allowed. It is also the only behavior in Spark 2.x and it is compatible with Hive. With strict policy, Spark doesn't allow any possible precision loss or data truncation in type coercion, e.g. convertingdoubletointordecimaltodoubleis not allowed.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.checkpointLocation",
    "defaultValue": "(none)",
    "meaning": "The default location for storing checkpoint data for streaming queries.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.continuous.epochBacklogQueueSize",
    "defaultValue": "10000",
    "meaning": "The max number of entries to be stored in queue to wait for late epochs. If this parameter is exceeded by the size of the queue, stream will stop with an error.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.disabledV2Writers",
    "defaultValue": "",
    "meaning": "A comma-separated list of fully qualified data source register class names for which StreamWriteSupport is disabled. Writes to these sources will fall back to the V1 Sinks.",
    "sinceVersion": "2.3.1"
  },
  {
    "propertyName": "spark.sql.streaming.fileSource.cleaner.numThreads",
    "defaultValue": "1",
    "meaning": "Number of threads used in the file source completed file cleaner.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.forceDeleteTempCheckpointLocation",
    "defaultValue": "false",
    "meaning": "When true, enable temporary checkpoint locations force delete.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.metricsEnabled",
    "defaultValue": "false",
    "meaning": "Whether Dropwizard/Codahale metrics will be reported for active streaming queries.",
    "sinceVersion": "2.0.2"
  },
  {
    "propertyName": "spark.sql.streaming.multipleWatermarkPolicy",
    "defaultValue": "min",
    "meaning": "Policy to calculate the global watermark value when there are multiple watermark operators in a streaming query. The default value is 'min' which chooses the minimum watermark reported across multiple operators. Other alternative value is 'max' which chooses the maximum across multiple operators. Note: This configuration cannot be changed between query restarts from the same checkpoint location.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.streaming.noDataMicroBatches.enabled",
    "defaultValue": "true",
    "meaning": "Whether streaming micro-batch engine will execute batches without data for eager state management for stateful streaming queries.",
    "sinceVersion": "2.4.1"
  },
  {
    "propertyName": "spark.sql.streaming.numRecentProgressUpdates",
    "defaultValue": "100",
    "meaning": "The number of progress updates to retain for a streaming query",
    "sinceVersion": "2.1.1"
  },
  {
    "propertyName": "spark.sql.streaming.realTimeMode.allowlistCheck",
    "defaultValue": "true",
    "meaning": "Whether to check all operators, sinks used in real-time mode are in the allowlist.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.streaming.realTimeMode.minBatchDuration",
    "defaultValue": "5000ms",
    "meaning": "The minimum long-running batch duration in milliseconds for real-time mode.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.streaming.sessionWindow.merge.sessions.in.local.partition",
    "defaultValue": "false",
    "meaning": "When true, streaming session window sorts and merge sessions in local partition prior to shuffle. This is to reduce the rows to shuffle, but only beneficial when there're lots of rows in a batch being assigned to same sessions.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.streaming.stateStore.commitValidation.enabled",
    "defaultValue": "true",
    "meaning": "When true, Spark will validate that all StateStore instances have committed for stateful streaming queries using foreachBatch. This helps detect cases where user-defined functions in foreachBatch (e.g., show(), limit()) don't process all partitions, which can lead to incorrect results. The validation only applies to foreachBatch sinks without global aggregates or limits.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.streaming.stateStore.encodingFormat",
    "defaultValue": "unsaferow",
    "meaning": "The encoding format used for stateful operators to store information in the state store",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.stateStore.stateSchemaCheck",
    "defaultValue": "true",
    "meaning": "When true, Spark will validate the state schema against schema on existing state and fail query if it's incompatible.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.streaming.stopActiveRunOnRestart",
    "defaultValue": "true",
    "meaning": "Running multiple runs of the same streaming query concurrently is not supported. If we find a concurrent active run for a streaming query (in the same or different SparkSessions on the same cluster) and this flag is true, we will stop the old streaming query run to start the new one.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.stopTimeout",
    "defaultValue": "0",
    "meaning": "How long to wait in milliseconds for the streaming execution thread to stop when calling the streaming query's stop() method. 0 or negative values wait indefinitely.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.transformWithState.stateSchemaVersion",
    "defaultValue": "3",
    "meaning": "The version of the state schema used by the transformWithState operator",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.thriftServer.interruptOnCancel",
    "defaultValue": "(value ofspark.sql.execution.interruptOnCancel)",
    "meaning": "When true, all running tasks will be interrupted if one cancels a query. When false, all running tasks will remain until finished.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.sql.thriftServer.queryTimeout",
    "defaultValue": "0ms",
    "meaning": "Set a query duration timeout in seconds in Thrift Server. If the timeout is set to a positive value, a running query will be cancelled automatically when the timeout is exceeded, otherwise the query continues to run till completion. If timeout values are set for each statement viajava.sql.Statement.setQueryTimeoutand they are smaller than this configuration value, they take precedence. If you set this timeout and prefer to cancel the queries right away without waiting task to finish, consider enabling spark.sql.thriftServer.interruptOnCancel together.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.thriftserver.scheduler.pool",
    "defaultValue": "(none)",
    "meaning": "Set a Fair Scheduler pool for a JDBC client session.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.sql.thriftserver.ui.retainedSessions",
    "defaultValue": "200",
    "meaning": "The number of SQL client sessions kept in the JDBC/ODBC web UI history.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.thriftserver.ui.retainedStatements",
    "defaultValue": "200",
    "meaning": "The number of SQL statements kept in the JDBC/ODBC web UI history.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.timeTravelTimestampKey",
    "defaultValue": "timestampAsOf",
    "meaning": "The option name to specify the time travel timestamp when reading a table.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.timeTravelVersionKey",
    "defaultValue": "versionAsOf",
    "meaning": "The option name to specify the time travel table version when reading a table.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.timeType.enabled",
    "defaultValue": "false",
    "meaning": "When true, the TIME data type is supported.",
    "sinceVersion": "4.1.0"
  },
  {
    "propertyName": "spark.sql.timestampType",
    "defaultValue": "TIMESTAMP_LTZ",
    "meaning": "Configures the default timestamp type of Spark SQL, including SQL DDL, Cast clause, type literal and the schema inference of data sources. Setting the configuration as TIMESTAMP_NTZ will use TIMESTAMP WITHOUT TIME ZONE as the default type while putting it as TIMESTAMP_LTZ will use TIMESTAMP WITH LOCAL TIME ZONE. Before the 3.4.0 release, Spark only supports the TIMESTAMP WITH LOCAL TIME ZONE type.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.transposeMaxValues",
    "defaultValue": "500",
    "meaning": "When doing a transpose without specifying values for the index column this is the maximum number of values that will be transposed without error.",
    "sinceVersion": "4.0.0"
  },
  {
    "propertyName": "spark.sql.tvf.allowMultipleTableArguments.enabled",
    "defaultValue": "false",
    "meaning": "When true, allows multiple table arguments for table-valued functions, receiving the cartesian product of all the rows of these tables.",
    "sinceVersion": "3.5.0"
  },
  {
    "propertyName": "spark.sql.ui.explainMode",
    "defaultValue": "formatted",
    "meaning": "Configures the query explain mode used in the Spark SQL UI. The value can be 'simple', 'extended', 'codegen', 'cost', or 'formatted'. The default value is 'formatted'.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.variable.substitute",
    "defaultValue": "true",
    "meaning": "This enables substitution using syntax like${var},${system:var}, and${env:var}.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.sql.cache.serializer",
    "defaultValue": "org.apache.spark.sql.execution.columnar.DefaultCachedBatchSerializer",
    "meaning": "The name of a class that implements org.apache.spark.sql.columnar.CachedBatchSerializer. It will be used to translate SQL data into a format that can more efficiently be cached. The underlying API is subject to change so use with caution. Multiple classes cannot be specified. The class must have a no-arg constructor.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.catalog.spark_catalog.defaultDatabase",
    "defaultValue": "default",
    "meaning": "The default database for session catalog.",
    "sinceVersion": "3.4.0"
  },
  {
    "propertyName": "spark.sql.event.truncate.length",
    "defaultValue": "2147483647",
    "meaning": "Threshold of SQL length beyond which it will be truncated before adding to event. Defaults to no truncation. If set to 0, callsite will be logged instead.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.extensions",
    "defaultValue": "(none)",
    "meaning": "A comma-separated list of classes that implement Function1[SparkSessionExtensions, Unit] used to configure Spark Session extensions. The classes must have a no-args constructor. If multiple extensions are specified, they are applied in the specified order. For the case of rules and planner strategies, they are applied in the specified order. For the case of parsers, the last parser is used and each parser can delegate to its predecessor. For the case of function name conflicts, the last registered function name is used.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.sql.extensions.test.loadFromCp",
    "defaultValue": "true",
    "meaning": "Flag that determines if we should load extensions from the classpath using the SparkSessionExtensionsProvider mechanism. This is a test only flag.",
    "sinceVersion": ""
  },
  {
    "propertyName": "spark.sql.hive.metastore.barrierPrefixes",
    "defaultValue": "",
    "meaning": "A comma separated list of class prefixes that should explicitly be reloaded for each version of Hive that Spark SQL is communicating with. For example, Hive UDFs that are declared in a prefix that typically would be shared (i.e.org.apache.spark.*).",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.hive.metastore.jars",
    "defaultValue": "builtin",
    "meaning": "\"Location of the jars that should be used to instantiate the HiveMetastoreClient. This property can be one of four options: 1. \"\"builtin\"\" Use Hive 2.3.10, which is bundled with the Spark assembly when-Phiveis enabled. When this option is chosen,spark.sql.hive.metastore.versionmust be either2.3.10or not defined. 2. \"\"maven\"\" Use Hive jars of specified version downloaded from Maven repositories. 3. \"\"path\"\" Use Hive jars configured byspark.sql.hive.metastore.jars.pathin comma separated format. Support both local or remote paths.The provided jars should be the same version asspark.sql.hive.metastore.version. 4. A classpath in the standard format for both Hive and Hadoop. The provided jars should be the same version asspark.sql.hive.metastore.version.\"",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.hive.metastore.jars.path",
    "defaultValue": "",
    "meaning": "Comma-separated paths of the jars that used to instantiate the HiveMetastoreClient. This configuration is useful only whenspark.sql.hive.metastore.jarsis set aspath. The paths can be any of the following format: 1. file://path/to/jar/foo.jar 2. hdfs://nameservice/path/to/jar/foo.jar 3. /path/to/jar/ (path without URI scheme follow conffs.defaultFS's URI schema) 4. [http/https/ftp]://path/to/jar/foo.jar Note that 1, 2, and 3 support wildcard. For example: 1. file://path/to/jar/,file://path2/to/jar//.jar 2. hdfs://nameservice/path/to/jar/,hdfs://nameservice2/path/to/jar//.jar",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.hive.metastore.sharedPrefixes",
    "defaultValue": "com.mysql.jdbc,com.mysql.cj,org.postgresql,com.microsoft.sqlserver,oracle.jdbc",
    "meaning": "A comma separated list of class prefixes that should be loaded using the classloader that is shared between Spark SQL and a specific version of Hive. An example of classes that should be shared is JDBC drivers that are needed to talk to the metastore. Other classes that need to be shared are those that interact with classes that are already shared. For example, custom appenders that are used by log4j.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.hive.metastore.version",
    "defaultValue": "2.3.10",
    "meaning": "Version of the Hive metastore. Available options are2.0.0through2.3.10,3.0.0through3.1.3and4.0.0through4.1.0.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.sql.hive.thriftServer.singleSession",
    "defaultValue": "false",
    "meaning": "When set to true, Hive Thrift server is running in a single session mode. All the JDBC/ODBC connections share the temporary views, function registries, SQL configuration and the current database.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.sql.hive.version",
    "defaultValue": "2.3.10",
    "meaning": "The compiled, a.k.a, builtin Hive version of the Spark distribution bundled with. Note that, this a read-only conf and only used to report the built-in hive version. If you want a different metastore client for Spark to call, please refer to spark.sql.hive.metastore.version.",
    "sinceVersion": "1.1.1"
  },
  {
    "propertyName": "spark.sql.metadataCacheTTLSeconds",
    "defaultValue": "-1000ms",
    "meaning": "Time-to-live (TTL) value for the metadata caches: partition file metadata cache and session catalog cache. This configuration only has an effect when this value having a positive value (> 0). It also requires setting 'spark.sql.catalogImplementation' tohive, setting 'spark.sql.hive.filesourcePartitionFileCacheSize' > 0 and setting 'spark.sql.hive.manageFilesourcePartitions' totrueto be applied to the partition file metadata cache.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.queryExecutionListeners",
    "defaultValue": "(none)",
    "meaning": "List of class names implementing QueryExecutionListener that will be automatically added to newly created sessions. The classes should have either a no-arg constructor, or a constructor that expects a SparkConf argument.",
    "sinceVersion": "2.3.0"
  },
  {
    "propertyName": "spark.sql.sources.disabledJdbcConnProviderList",
    "defaultValue": "",
    "meaning": "Configures a list of JDBC connection providers, which are disabled. The list contains the name of the JDBC connection providers separated by comma.",
    "sinceVersion": "3.1.0"
  },
  {
    "propertyName": "spark.sql.streaming.streamingQueryListeners",
    "defaultValue": "(none)",
    "meaning": "List of class names implementing StreamingQueryListener that will be automatically added to newly created sessions. The classes should have either a no-arg constructor, or a constructor that expects a SparkConf argument.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.sql.streaming.ui.enabled",
    "defaultValue": "true",
    "meaning": "Whether to run the Structured Streaming Web UI for the Spark application when the Spark Web UI is enabled.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.ui.retainedProgressUpdates",
    "defaultValue": "100",
    "meaning": "The number of progress updates to retain for a streaming query for Structured Streaming UI.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.streaming.ui.retainedQueries",
    "defaultValue": "100",
    "meaning": "The number of inactive queries to retain for Structured Streaming UI.",
    "sinceVersion": "3.0.0"
  },
  {
    "propertyName": "spark.sql.ui.retainedExecutions",
    "defaultValue": "1000",
    "meaning": "Number of executions to retain in the Spark UI.",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.sql.warehouse.dir",
    "defaultValue": "(value of$PWD/spark-warehouse)",
    "meaning": "The default location for managed databases and tables.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.streaming.backpressure.enabled",
    "defaultValue": "false",
    "meaning": "Enables or disables Spark Streaming's internal backpressure mechanism (since 1.5). This enables the Spark Streaming to control the receiving rate based on the current batch scheduling delays and processing times so that the system receives only as fast as the system can process. Internally, this dynamically sets the maximum receiving rate of receivers. This rate is upper bounded by the valuesspark.streaming.receiver.maxRateandspark.streaming.kafka.maxRatePerPartitionif they are set (see below).",
    "sinceVersion": "1.5.0"
  },
  {
    "propertyName": "spark.streaming.backpressure.initialRate",
    "defaultValue": "not set",
    "meaning": "This is the initial maximum receiving rate at which each receiver will receive data for the first batch when the backpressure mechanism is enabled.",
    "sinceVersion": "2.0.0"
  },
  {
    "propertyName": "spark.streaming.blockInterval",
    "defaultValue": "200ms",
    "meaning": "Interval at which data received by Spark Streaming receivers is chunked into blocks of data before storing them in Spark. Minimum recommended - 50 ms. See theperformance tuningsection in the Spark Streaming programming guide for more details.",
    "sinceVersion": "0.8.0"
  },
  {
    "propertyName": "spark.streaming.receiver.maxRate",
    "defaultValue": "not set",
    "meaning": "Maximum rate (number of records per second) at which each receiver will receive data. Effectively, each stream will consume at most this number of records per second. Setting this configuration to 0 or a negative number will put no limit on the rate. See thedeployment guidein the Spark Streaming programming guide for mode details.",
    "sinceVersion": "1.0.2"
  },
  {
    "propertyName": "spark.streaming.receiver.writeAheadLog.enable",
    "defaultValue": "false",
    "meaning": "Enable write-ahead logs for receivers. All the input data received through receivers will be saved to write-ahead logs that will allow it to be recovered after driver failures. See thedeployment guidein the Spark Streaming programming guide for more details.",
    "sinceVersion": "1.2.1"
  },
  {
    "propertyName": "spark.streaming.unpersist",
    "defaultValue": "true",
    "meaning": "Force RDDs generated and persisted by Spark Streaming to be automatically unpersisted from Spark's memory. The raw input data received by Spark Streaming is also automatically cleared. Setting this to false will allow the raw data and persisted RDDs to be accessible outside the streaming application as they will not be cleared automatically. But it comes at the cost of higher memory usage in Spark.",
    "sinceVersion": "0.9.0"
  },
  {
    "propertyName": "spark.streaming.stopGracefullyOnShutdown",
    "defaultValue": "false",
    "meaning": "Iftrue, Spark shuts down theStreamingContextgracefully on JVM shutdown rather than immediately.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.streaming.kafka.maxRatePerPartition",
    "defaultValue": "not set",
    "meaning": "Maximum rate (number of records per second) at which data will be read from each Kafka partition when using the new Kafka direct stream API. See theKafka Integration guidefor more details.",
    "sinceVersion": "1.3.0"
  },
  {
    "propertyName": "spark.streaming.kafka.minRatePerPartition",
    "defaultValue": "1",
    "meaning": "Minimum rate (number of records per second) at which data will be read from each Kafka partition when using the new Kafka direct stream API.",
    "sinceVersion": "2.4.0"
  },
  {
    "propertyName": "spark.streaming.ui.retainedBatches",
    "defaultValue": "1000",
    "meaning": "How many batches the Spark Streaming UI and status APIs remember before garbage collecting.",
    "sinceVersion": "1.0.0"
  },
  {
    "propertyName": "spark.streaming.driver.writeAheadLog.closeFileAfterWrite",
    "defaultValue": "false",
    "meaning": "Whether to close the file after writing a write-ahead log record on the driver. Set this to 'true' when you want to use S3 (or any file system that does not support flushing) for the metadata WAL on the driver.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.streaming.receiver.writeAheadLog.closeFileAfterWrite",
    "defaultValue": "false",
    "meaning": "Whether to close the file after writing a write-ahead log record on the receivers. Set this to 'true' when you want to use S3 (or any file system that does not support flushing) for the data WAL on the receivers.",
    "sinceVersion": "1.6.0"
  },
  {
    "propertyName": "spark.r.numRBackendThreads",
    "defaultValue": "2",
    "meaning": "Number of threads used by RBackend to handle RPC calls from SparkR package.",
    "sinceVersion": "1.4.0"
  },
  {
    "propertyName": "spark.r.command",
    "defaultValue": "Rscript",
    "meaning": "Executable for executing R scripts in cluster modes for both driver and workers.",
    "sinceVersion": "1.5.3"
  },
  {
    "propertyName": "spark.r.driver.command",
    "defaultValue": "spark.r.command",
    "meaning": "Executable for executing R scripts in client modes for driver. Ignored in cluster modes.",
    "sinceVersion": "1.5.3"
  },
  {
    "propertyName": "spark.r.shell.command",
    "defaultValue": "R",
    "meaning": "Executable for executing sparkR shell in client modes for driver. Ignored in cluster modes. It is the same as environment variableSPARKR_DRIVER_R, but take precedence over it.spark.r.shell.commandis used for sparkR shell whilespark.r.driver.commandis used for running R script.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.r.backendConnectionTimeout",
    "defaultValue": "6000",
    "meaning": "Connection timeout set by R process on its connection to RBackend in seconds.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.r.heartBeatInterval",
    "defaultValue": "100",
    "meaning": "Interval for heartbeats sent from SparkR backend to R process to prevent connection timeout.",
    "sinceVersion": "2.1.0"
  },
  {
    "propertyName": "spark.graphx.pregel.checkpointInterval",
    "defaultValue": "-1",
    "meaning": "Checkpoint interval for graph and message in Pregel. It used to avoid stackOverflowError due to long lineage chains after lots of iterations. The checkpoint is disabled by default.",
    "sinceVersion": "2.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.server.mergedShuffleFileManagerImpl",
    "defaultValue": "org.apache.spark.network.shuffle.NoOpMergedShuffleFileManager",
    "meaning": "Class name of the implementation ofMergedShuffleFileManagerthat manages push-based shuffle. This acts as a server side config to disable or enable push-based shuffle. By default, push-based shuffle is disabled at the server side.To enable push-based shuffle on the server side, set this config toorg.apache.spark.network.shuffle.RemoteBlockPushResolver",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.server.minChunkSizeInMergedShuffleFile",
    "defaultValue": "2m",
    "meaning": "The minimum size of a chunk when dividing a merged shuffle file into multiple chunks during push-based shuffle. A merged shuffle file consists of multiple small shuffle blocks. Fetching the complete merged shuffle file in a single disk I/O increases the memory requirements for both the clients and the external shuffle services. Instead, the external shuffle service serves the merged file inMB-sized chunks.This configuration controls how big a chunk can get. A corresponding index file for each merged shuffle file will be generated indicating chunk boundaries.Setting this too high would increase the memory requirements on both the clients and the external shuffle service.Setting this too low would increase the overall number of RPC requests to external shuffle service unnecessarily.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.server.mergedIndexCacheSize",
    "defaultValue": "100m",
    "meaning": "The maximum size of cache in memory which could be used in push-based shuffle for storing merged index files. This cache is in addition to the one configured viaspark.shuffle.service.index.cache.size.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.enabled",
    "defaultValue": "false",
    "meaning": "Set to true to enable push-based shuffle on the client side and works in conjunction with the server side flagspark.shuffle.push.server.mergedShuffleFileManagerImpl.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.finalize.timeout",
    "defaultValue": "10s",
    "meaning": "The amount of time driver waits in seconds, after all mappers have finished for a given shuffle map stage, before it sends merge finalize requests to remote external shuffle services. This gives the external shuffle services extra time to merge blocks. Setting this too long could potentially lead to performance regression.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.maxRetainedMergerLocations",
    "defaultValue": "500",
    "meaning": "Maximum number of merger locations cached for push-based shuffle. Currently, merger locations are hosts of external shuffle services responsible for handling pushed blocks, merging them and serving merged blocks for later shuffle fetch.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.mergersMinThresholdRatio",
    "defaultValue": "0.05",
    "meaning": "Ratio used to compute the minimum number of shuffle merger locations required for a stage based on the number of partitions for the reducer stage. For example, a reduce stage which has 100 partitions and uses the default value 0.05 requires at least 5 unique merger locations to enable push-based shuffle.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.mergersMinStaticThreshold",
    "defaultValue": "5",
    "meaning": "The static threshold for number of shuffle push merger locations should be available in order to enable push-based shuffle for a stage. Note this config works in conjunction withspark.shuffle.push.mergersMinThresholdRatio. Maximum ofspark.shuffle.push.mergersMinStaticThresholdandspark.shuffle.push.mergersMinThresholdRatioratio number of mergers needed to enable push-based shuffle for a stage. For example: with 1000 partitions for the child stage with spark.shuffle.push.mergersMinStaticThreshold as 5 and spark.shuffle.push.mergersMinThresholdRatio set to 0.05, we would need at least 50 mergers to enable push-based shuffle for that stage.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.numPushThreads",
    "defaultValue": "(none)",
    "meaning": "Specify the number of threads in the block pusher pool. These threads assist in creating connections and pushing blocks to remote external shuffle services. By default, the threadpool size is equal to the number of spark executor cores.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.maxBlockSizeToPush",
    "defaultValue": "1m",
    "meaning": "The max size of an individual block to push to the remote external shuffle services. Blocks larger than this threshold are not pushed to be merged remotely. These shuffle blocks will be fetched in the original manner.Setting this too high would result in more blocks to be pushed to remote external shuffle services but those are already efficiently fetched with the existing mechanisms resulting in additional overhead of pushing the large blocks to remote external shuffle services. It is recommended to setspark.shuffle.push.maxBlockSizeToPushlesser thanspark.shuffle.push.maxBlockBatchSizeconfig's value.Setting this too low would result in lesser number of blocks getting merged and directly fetched from mapper external shuffle service results in higher small random reads affecting overall disk I/O performance.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.maxBlockBatchSize",
    "defaultValue": "3m",
    "meaning": "The max size of a batch of shuffle blocks to be grouped into a single push request. Default is set to3min order to keep it slightly higher thanspark.storage.memoryMapThresholddefault which is2mas it is very likely that each batch of block gets memory mapped which incurs higher overhead.",
    "sinceVersion": "3.2.0"
  },
  {
    "propertyName": "spark.shuffle.push.merge.finalizeThreads",
    "defaultValue": "8",
    "meaning": "Number of threads used by driver to finalize shuffle merge. Since it could potentially take seconds for a large shuffle to finalize, having multiple threads helps driver to handle concurrent shuffle merge finalize requests when push-based shuffle is enabled.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.shuffle.push.minShuffleSizeToWait",
    "defaultValue": "500m",
    "meaning": "Driver will wait for merge finalization to complete only if total shuffle data size is more than this threshold. If total shuffle size is less, driver will immediately finalize the shuffle output.",
    "sinceVersion": "3.3.0"
  },
  {
    "propertyName": "spark.shuffle.push.minCompletedPushRatio",
    "defaultValue": "1.0",
    "meaning": "Fraction of minimum map partitions that should be push complete before driver starts shuffle merge finalization during push based shuffle.",
    "sinceVersion": "3.3.0"
  }
];
