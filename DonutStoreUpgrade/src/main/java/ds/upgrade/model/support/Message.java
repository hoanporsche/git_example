package ds.upgrade.model.support;

public class Message {

  private Sender from;
  private String text;

  public Sender getFrom() {
    return from;
  }

  public void setFrom(Sender from) {
    this.from = from;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

}
