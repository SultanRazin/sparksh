import { t, fg } from "@opentui/core";
import { getCommLogs } from "./useSpark";
import { useKeyboard } from "@opentui/react";

type Props = {
  onClose: () => void;
};

export function CommLogPanel({ onClose }: Props) {
  useKeyboard((key) => {
    if (key.name === "escape" || (key.name === "l" && key.ctrl)) {
      onClose();
    }
  });
  return (
    <box
      style={{
        position: "absolute",
        top: 1,
        left: 2,
        right: 2,
        bottom: 2,
        borderColor: "#6cf",
        backgroundColor: "#111",
        flexDirection: "column",
      }}
    >
      <box style={{ height: 1, backgroundColor: "#333" }}>
        <text
          content={t`${fg("#6cf")(" Communication Log (Ctrl+L to close) ")}`}
        />
      </box>
      <scrollbox
        style={{ flexGrow: 1, stickyScroll: true, stickyStart: "bottom" }}
        focused={true}
      >
        {getCommLogs().map((log, i) => (
          <text
            key={i}
            content={t`${fg(log.direction === "send" ? "#fa0" : "#4a4")(
              log.direction === "send" ? "→ SEND: " : "← RECV: ",
            )}${fg("#888")(log.data.slice(0, 200))}${log.data.length > 200 ? "..." : ""}`}
          />
        ))}
      </scrollbox>
    </box>
  );
}
