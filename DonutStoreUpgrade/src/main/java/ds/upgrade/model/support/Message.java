package ds.upgrade.model.support;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

public class Message {

  @NotNull
  @NotEmpty
  private Sender senderDb;
  @NotEmpty
  @NotNull
  @Size(max = 255)
  private String text;

  public Message() {
  }

  public Sender getSenderDb() {
    return senderDb;
  }

  public void setSenderDb(Sender senderDb) {
    this.senderDb = senderDb;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

}
