import { fg, t } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import type { ConfigInfo } from "../types";

type Props = {
  configName: string;
  configs: ConfigInfo[];
  onClose: () => void;
};

export function ConfigsInfoPanel({ configName, configs, onClose }: Props) {
  useKeyboard((key) => {
    if (key.name === "escape") {
      onClose();
    }
  });

  const c = configs.find((fn) => fn.propertyName === configName);
  if (!c) {
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
        <text content={t`${fg("#6cf")(" Config Info (Esc to close) ")}`} />
      </box>
      <scrollbox
        style={{ flexGrow: 1, stickyScroll: true, stickyStart: "top" }}
        focused={true}
      >
        <text
          content={t`${fg("#4a4")("Name: ")}${fg("#fff")(c.propertyName)}`}
        />
        <text content="" />
        {c.defaultValue && (
          <>
            <text content={t`${fg("#6cf")("Default Value:")}`} />
            <text content={t`  ${fg("#fff")(c.defaultValue)}`} />
            <text content="" />
          </>
        )}
        {c.meaning && (
          <>
            <text content={t`${fg("#6cf")("Meaning:")}`} />
            <text content={t`  ${fg("#888")(c.meaning)}`} />
            <text content="" />
          </>
        )}
        {c.sinceVersion && (
          <>
            <text content={t`${fg("#6cf")("Since Version:")}`} />
            <text content={t`  ${fg("#888")(c.sinceVersion)}`} />
            <text content="" />
          </>
        )}
      </scrollbox>
    </box>
  );
}
