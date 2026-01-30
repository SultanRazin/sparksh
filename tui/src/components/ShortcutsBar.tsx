import { t, fg } from "@opentui/core";

export function ShortcutsBar() {
  return (
    <box style={{ height: 1 }}>
      <text
        content={t`${fg("#888")("^\u21B5 Run \u00B7 \u21E5 Complete \u00B7 ^R History \u00B7 ^F Funcs \u00B7 ^L Logs \u00B7 ^\u2191/\u2193 Resize")}`}
      />
    </box>
  );
}
