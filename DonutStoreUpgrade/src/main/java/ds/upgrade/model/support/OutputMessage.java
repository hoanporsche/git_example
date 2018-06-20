package ds.upgrade.model.support;

import ds.upgrade.model.MessageDb;

public class OutputMessage {

  private Object senderDb;
  private Object text;
  private Object time;
  private Object roomName;

  public OutputMessage(final Object from, final Object text, final Object time) {

      this.senderDb = from;
      this.text = text;
      this.time = time;
  }
  
  public OutputMessage(MessageDb messageDb) {
    Sender sender = new Sender(messageDb.getSenderDbId());
    this.senderDb = sender;
    this.text = messageDb.getText();
    this.time = messageDb.getTime();
    this.roomName = messageDb.getRoomDbId().getName();
  }

  public Object getText() {
      return text;
  }

  public Object getTime() {
      return time;
  }

  public Object getSenderDb() {
      return senderDb;
  }

  public Object getRoomName() {
    return roomName;
  }

  @Override
  public String toString() {
    return "OutputMessage [senderDb=" + senderDb + ", text=" + text + ", time=" + time + ", roomName="
        + roomName + "]";
  }
}
