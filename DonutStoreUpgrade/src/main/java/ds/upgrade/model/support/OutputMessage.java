package ds.upgrade.model.support;

public class OutputMessage {

  private Object from;
  private Object text;
  private Object time;

  public OutputMessage(final Object from, final Object text, final Object time) {

      this.from = from;
      this.text = text;
      this.time = time;
  }

  public Object getText() {
      return text;
  }

  public Object getTime() {
      return time;
  }

  public Object getFrom() {
      return from;
  }
}
