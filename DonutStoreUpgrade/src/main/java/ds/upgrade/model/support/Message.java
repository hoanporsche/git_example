package ds.upgrade.model.support;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class Message {

  @NotNull
  @NotEmpty
  private Sender from;
  @NotEmpty
  @NotNull
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

  @Override
  public String toString() {
    return "Message [from=" + from + ", text=" + text + "]";
  }

}
