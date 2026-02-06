package repl

import java.io.{ByteArrayOutputStream, OutputStream, PrintStream}

class SwitchableOutputStream(original: PrintStream) extends OutputStream {
  private var capture: ByteArrayOutputStream = _

  def startCapture(): Unit = {
    capture = new ByteArrayOutputStream()
  }

  def stopCapture(): String = {
    if (capture != null) {
      val result = capture.toString
      capture = null
      result
    } else ""
  }

  override def write(b: Int): Unit = {
    if (capture != null) capture.write(b)
    else original.write(b)
  }

  override def write(b: Array[Byte]): Unit = {
    if (capture != null) capture.write(b)
    else original.write(b)
  }

  override def write(b: Array[Byte], off: Int, len: Int): Unit = {
    if (capture != null) capture.write(b, off, len)
    else original.write(b, off, len)
  }

  override def flush(): Unit = {
    if (capture != null) capture.flush()
    original.flush()
  }
}
