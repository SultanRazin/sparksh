import { createCliRenderer, SyntaxStyle, RGBA, type TextareaRenderable } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { createHighlighter } from "shiki"
import { useRef, useEffect, useState } from "react"

const highlighter = await createHighlighter({ themes: ["github-dark"], langs: ["scala"] })
const syntaxStyle = SyntaxStyle.create()
const styleIds = new Map<string, number>()

const getStyleId = (color: string) =>
    styleIds.get(color) ?? styleIds.set(color, syntaxStyle.registerStyle(color, { fg: RGBA.fromHex(color) })).get(color)!

function App() {
    const [code, setCode] = useState("")
    const ref = useRef<TextareaRenderable>(null)

    useEffect(() => {
        const ta = ref.current
        if (!ta) return
        ta.clearAllHighlights()
        if (!code) return

        const { tokens } = highlighter.codeToTokens(code, { lang: "scala", theme: "github-dark" })
        tokens.forEach((line, lineIdx) => {
            let col = 0
            line.forEach(({ content, color }) => {
                ta.addHighlight(lineIdx, { start: col, end: col + content.length, styleId: getStyleId(color || "#fff") })
                col += content.length
            })
        })
    }, [code])

    return (
        <box style={{ border: true, flexGrow: 1, flexDirection: "column" }}>
            <textarea
                ref={ref}
                placeholder="Enter Scala code..."
                focused
                syntaxStyle={syntaxStyle}
                keyBindings={[
                    { name: "backspace", alt: true, action: "delete-word-backward" },
                    { name: "delete", alt: true, action: "delete-word-forward" },
                ]}
                onContentChange={() => setCode(ref.current?.plainText ?? "")}
            />
        </box>
    )
}

createRoot(await createCliRenderer()).render(<App />)
