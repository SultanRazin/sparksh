import { SyntaxStyle, RGBA } from "@opentui/core";
import { createHighlighter } from "shiki";

export const highlighter = await createHighlighter({ themes: ["github-dark"], langs: ["scala"] });
export const syntaxStyle = SyntaxStyle.create();

const styleIds = new Map<string, number>();

export const getStyleId = (color: string) =>
  styleIds.get(color) ?? styleIds.set(color, syntaxStyle.registerStyle(color, { fg: RGBA.fromHex(color) })).get(color)!;
