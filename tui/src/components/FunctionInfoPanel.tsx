import { t, fg } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import type { FunctionInfo } from "../types";

type Props = {
  functionName: string;
  functions: FunctionInfo[];
  onClose: () => void;
};

export function FunctionInfoPanel({ functionName, functions, onClose }: Props) {
  useKeyboard((key) => {
    if (key.name === "escape") {
      onClose();
    }
  });

  const f = functions.find((fn) => fn.name === functionName);
  if (!f) {
    return null;
  }

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
        <text content={t`${fg("#6cf")(" Function Info (Esc to close) ")}`} />
      </box>
      <scrollbox
        style={{ flexGrow: 1, stickyScroll: true, stickyStart: "top" }}
        focused={true}
      >
        <text content={t`${fg("#4a4")("Name: ")}${fg("#fff")(f.name)}`} />
        <text content="" />
        {f.usage && (
          <>
            <text content={t`${fg("#6cf")("Usage:")}`} />
            {f.usage.split("\n").map((line, i) => (
              <text key={`u${i}`} content={t`  ${fg("#fff")(line)}`} />
            ))}
            <text content="" />
          </>
        )}
        {f.extended && (
          <>
            <text content={t`${fg("#6cf")("Description:")}`} />
            {f.extended.split("\n").map((line, i) => (
              <text key={`e${i}`} content={t`  ${fg("#888")(line)}`} />
            ))}
            <text content="" />
          </>
        )}
        {f.examples && (
          <>
            <text content={t`${fg("#6cf")("Examples:")}`} />
            {f.examples.split("\n").map((line, i) => (
              <text key={`x${i}`} content={t`  ${fg("#fa0")(line)}`} />
            ))}
          </>
        )}
      </scrollbox>
    </box>
  );
}
