package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ds.upgrade.model.SenderDb;

@Entity
@Table(name = "message_db")
public class MessageDb implements Serializable{

  private static final long serialVersionUID = 4197942078910386097L;
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;
  @ManyToOne
  @JoinColumn(name = "sender_db_id", referencedColumnName = "id", nullable = true)
  private SenderDb senderDbId;
  @Column(name = "text")
  private String text;
  @Column(name = "time")
  private Date time;
  
  public MessageDb() {}
  
  public MessageDb(SenderDb senderDsId, String text) {
    this.senderDbId = senderDsId;
    this.text = text;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public SenderDb getSenderDbId() {
    return senderDbId;
  }

  public void setSenderDbId(SenderDb senderDbId) {
    this.senderDbId = senderDbId;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Date getTime() {
    return time;
  }

  public void setTime(Date time) {
    this.time = time;
  }

  @Override
  public String toString() {
    return "MessageDb [id=" + id + ", senderDbId=" + senderDbId + ", text=" + text + ", time="
        + time + "]";
  }
}
