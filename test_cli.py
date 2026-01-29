#!/usr/bin/env python3
import subprocess
import json
import readline

JAR_PATH = "target/scala-2.13/spark-tui-backend-assembly-0.1.0.jar"

def read_json_line(proc):
    while True:
        line = proc.stdout.readline()
        if not line:
            return None
        try:
            return json.loads(line)
        except json.JSONDecodeError:
            continue

def main():
    print("starting")

    proc = subprocess.Popen(
        ["spark-submit", "--class", "Main", JAR_PATH],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
        bufsize=1
    )

    status = read_json_line(proc)
    if status and status.get("status") == "ready":
        print("✓ Spark ready!\n")
    else:
        print(f"Failed to start: {status}")
        return

    print("Type Spark/Scala code. Commands: :quit to exit, :multi for multiline\n")

    while True:
        try:
            line = input("\033[1;36mspark>\033[0m ")
        except (EOFError, KeyboardInterrupt):
            print("\nExiting...")
            break

        if not line.strip():
            continue

        if line.strip() == ":quit":
            proc.stdin.write(json.dumps({"cmd": "quit"}) + "\n")
            proc.stdin.flush()
            print(read_json_line(proc))
            break

        if line.strip() == ":multi":
            print("Enter code, then ';;' on a new line to execute:")
            lines = []
            while True:
                try:
                    ml = input("     | ")
                    if ml.strip() == ";;":
                        break
                    lines.append(ml)
                except (EOFError, KeyboardInterrupt):
                    break
            line = "\n".join(lines)
            if not line.strip():
                continue

        proc.stdin.write(json.dumps({"cmd": "eval", "code": line}) + "\n")
        proc.stdin.flush()

        result = read_json_line(proc)
        if result:
            status = result.get("status", "")
            output = result.get("output", "")

            if status == "ok":
                print(output)
            elif status == "error":
                print(f"\033[1;31m{output}\033[0m")
            elif status == "incomplete":
                print(f"\033[1;33mIncomplete input\033[0m")
            else:
                print(result)
        print()

    proc.terminate()

if __name__ == "__main__":
    main()