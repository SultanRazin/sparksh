import { useState } from "react";
import { useKeyboard } from "@opentui/react";

interface FilterablePopupProps {
  items: string[];
  placeholder?: string;
  onSelect: (item: string) => void;
  onClose: () => void;
}

export function FilterablePopup({
  items,
  placeholder = "Filter...",
  onSelect,
  onClose,
}: FilterablePopupProps) {
  const [filter, setFilter] = useState("");
  const [idx, setIdx] = useState(0);

  const filtered = filter
    ? items.filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
    : items;

  const safeIdx = Math.min(idx, Math.max(0, filtered.length - 1));
  const maxVisible = 10;
  const start = Math.max(
    0,
    Math.min(safeIdx - 2, filtered.length - maxVisible),
  );
  const visible = filtered.slice(start, start + maxVisible);

  useKeyboard((key) => {
    if (key.name === "down" || (key.name === "n" && (key.ctrl || key.option))) {
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
      return;
    }
    if (key.name === "up" || (key.name === "p" && (key.ctrl || key.option))) {
      setIdx((i) => Math.max(i - 1, 0));
      return;
    }
    if (key.name === "return" || key.name === "tab") {
      const selected = filtered[safeIdx];
      if (filtered.length > 0 && selected) onSelect(selected);
      return;
    }
    if (key.name === "escape") {
      onClose();
      return;
    }
  });

  return (
    <box
      style={{
        position: "absolute",
        bottom: 11,
        left: 0,
        right: 0,
        border: true,
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
      }}
    >
      <input
        placeholder={placeholder}
        focused
        onInput={(value) => {
          setFilter(value);
          setIdx(0);
        }}
        onSubmit={() => {
          const selected = filtered[safeIdx];
          if (filtered.length > 0 && selected) onSelect(selected);
        }}
      />
      {filtered.length === 0 ? (
        <text style={{ fg: "#888" }}>No matches</text>
      ) : (
        visible.map((item, i) => (
          <text
            key={`${item}-${i}`}
            style={{ fg: start + i === safeIdx ? "#ff0" : "#fff" }}
          >
            {start + i === safeIdx ? "> " : "  "}
            {item}
          </text>
        ))
      )}
      {filtered.length > maxVisible && (
        <text style={{ fg: "#888" }}>
          {safeIdx + 1}/{filtered.length}
        </text>
      )}
    </box>
  );
}
