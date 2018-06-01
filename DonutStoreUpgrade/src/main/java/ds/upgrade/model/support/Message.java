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
  private String roomName;

  public Message() {}
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

  public String getRoomName() {
    return roomName;
  }

  public void setRoomName(String roomName) {
    this.roomName = roomName;
  }
  @Override
  public String toString() {
    return "Message [from=" + from + ", text=" + text + ", roomName=" + roomName + "]";
  }

}
