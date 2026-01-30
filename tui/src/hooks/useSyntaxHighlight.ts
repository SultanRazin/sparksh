import { useEffect } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { highlighter, getStyleId } from "../utils/highlight";

const BRACKET_COLORS = [
  "#f9e64f",
  "#da70d6",
  "#6be5fd",
  "#87d96c",
  "#ff9e64",
  "#bb9af7",
  "#7dcfff",
  "#f7768e",
  "#73daca",
  "#ff7a93",
];

export function useSyntaxHighlight(
  ref: React.RefObject<TextareaRenderable | null>,
  code: string
) {
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.clearAllHighlights();
    if (!code) return;

    const { tokens } = highlighter.codeToTokens(code, {
      lang: "scala",
      theme: "github-dark",
    });

    let depth = 0;

    tokens.forEach((line, lineIdx) => {
      let col = 0;
      line.forEach(({ content, color }) => {
        const tokenColor = color ?? "#fff";
        const hasBrackets = /[()[\]{}]/.test(content);

        if (!hasBrackets) {
          ta.addHighlight(lineIdx, {
            start: col,
            end: col + content.length,
            styleId: getStyleId(tokenColor),
          });
        } else {
          for (let i = 0; i < content.length; i++) {
            const char = content[i]!;
            const bracketColor = BRACKET_COLORS[depth % BRACKET_COLORS.length]!;
            if ("([{".includes(char)) {
              ta.addHighlight(lineIdx, {
                start: col + i,
                end: col + i + 1,
                styleId: getStyleId(bracketColor),
              });
              depth++;
            } else if (")]}".includes(char)) {
              depth = Math.max(0, depth - 1);
              const closeBracketColor = BRACKET_COLORS[depth % BRACKET_COLORS.length]!;
              ta.addHighlight(lineIdx, {
                start: col + i,
                end: col + i + 1,
                styleId: getStyleId(closeBracketColor),
              });
            } else {
              ta.addHighlight(lineIdx, {
                start: col + i,
                end: col + i + 1,
                styleId: getStyleId(tokenColor),
              });
            }
          }
        }
        col += content.length;
      });
    });
  }, [code]);
}
