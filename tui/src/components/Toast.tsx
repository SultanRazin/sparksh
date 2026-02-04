interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <box
      style={{
        position: "absolute",
        bottom: 3,
        right: 2,
        backgroundColor: "#2d4",
        paddingLeft: 2,
        paddingRight: 2,
        border: true,
        borderColor: "#4f8",
      }}
    >
      <text style={{ fg: "#000" }}>{message}</text>
    </box>
  );
}
