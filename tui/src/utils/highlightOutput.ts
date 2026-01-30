import { t, fg, type StyledText } from "@opentui/core";

export function highlightOutputLine(line: string): StyledText {
  const resultPattern = /^(val |var )?(\w+): (.+?) = (.+)$/;
  const match = line.match(resultPattern);

  if (match && match[2] && match[3] && match[4]) {
    const prefix = match[1] ?? "";
    const varName = match[2];
    const type = match[3];
    const value = match[4];
    return t`${fg("#569cd6")(prefix)}${fg("#c586c0")(varName)}: ${fg("#4ec9b0")(type)} = ${highlightValue(value)}`;
  }

  return t`${line}`;
}

function highlightValue(value: string) {
  if (value.startsWith('"')) return fg("#ce9178")(value);
  if (/^-?\d/.test(value)) return fg("#b5cea8")(value);
  if (value === "true" || value === "false") return fg("#569cd6")(value);
  return value;
}

export function errorLine(line: string): StyledText {
  return t`${fg("#f44")(line)}`;
}
