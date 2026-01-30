import type { HistoryEntry, Status, DebugInfo } from "../types";
import { highlightOutputLine, errorLine } from "../utils/highlightOutput";
import { WelcomeScreen } from "./WelcomeScreen";

interface OutputHistoryProps {
  history: HistoryEntry[];
  status: Status;
  debugInfo: DebugInfo;
  focused: boolean;
}

export function OutputHistory({ history, status, debugInfo, focused }: OutputHistoryProps) {
  return (
    <scrollbox
      style={{
        flexGrow: 1,
        stickyScroll: true,
        stickyStart: "bottom",
      }}
      focused={focused}
    >
      {history.length === 0 ? (
        <WelcomeScreen status={status} debugInfo={debugInfo} />
      ) : (
        history.flatMap((h, i) => [
          <text key={`c${i}`} style={{ fg: "#6cf" }}>
            {">>> " + h.code}
          </text>,
          ...h.output.split("\n").map((line, j) => (
            <box
              style={{ backgroundColor: "#1a1a1a" }}
              key={`o-box${i}-${j}`}
            >
              <text
                key={`o${i}-${j}`}
                content={
                  h.isError ? errorLine(line) : highlightOutputLine(line)
                }
              />
            </box>
          )),
          <text key={`s${i}`}> </text>,
        ])
      )}
    </scrollbox>
  );
}
