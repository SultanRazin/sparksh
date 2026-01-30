import { t, fg } from "@opentui/core";
import type { Status, DebugInfo } from "../types";

interface WelcomeScreenProps {
  status: Status;
  debugInfo: DebugInfo;
}

export function WelcomeScreen({ status, debugInfo }: WelcomeScreenProps) {
  return (
    <box
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ascii-font text="SparkSH" font="block" />
      {status === "error" && (
        <box
          style={{
            marginTop: 2,
            padding: 1,
            border: true,
            borderColor: "#f44",
            flexDirection: "column",
            width: 80,
          }}
        >
          <text content={t`${fg("#f44")("Debug Info")}`} />
          <text content={t`${fg("#888")("\u2500".repeat(37))}`} />
          <text content={t`${fg("#6cf")("Detected Spark:")} ${fg("#fff")(debugInfo.detectedSparkVersion || "unknown")}`} />
          <text content={t`${fg("#6cf")("SPARK_HOME:")} ${fg("#fff")(debugInfo.sparkHome)}`} />
          <text content={t`${fg("#6cf")("JAVA_HOME:")} ${fg("#fff")(debugInfo.javaHome)}`} />
          <text content={t`${fg("#6cf")("JAR Path:")} ${fg("#fff")(debugInfo.jarPath)}`} />
          <text content={t`${fg("#888")("\u2500".repeat(37))}`} />
          <text content={t`${fg("#fa0")("Command:")}`} />
          <text content={t`${fg("#888")(debugInfo.command)}`} />
          {debugInfo.stderr && (
            <>
              <text content={t`${fg("#888")("\u2500".repeat(37))}`} />
              <text content={t`${fg("#f44")("stderr:")}`} />
              {debugInfo.stderr.slice(-2000).split("\n").map((line, i) => (
                <text key={i} content={t`${fg("#888")(line)}`} />
              ))}
            </>
          )}
        </box>
      )}
    </box>
  );
}
