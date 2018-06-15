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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "notification_db")
public class NotificationDb implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  
  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  @JsonIgnore
  private User userId;
  @Column(name = "text", nullable = false)
  private String text;
  @Column(name = "time", nullable = false)
  private Date time = new Date();
  @Column(name = "seen", nullable = false)
  private boolean seen;

  public NotificationDb() {}
  
  public NotificationDb(User userId, String text) {
    this.userId = userId;
    this.text = text;
    this.seen = false;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUserId() {
    return userId;
  }

  public void setUserId(User userId) {
    this.userId = userId;
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

  public boolean isSeen() {
    return seen;
  }

  public void setSeen(boolean seen) {
    this.seen = seen;
  }

  @Override
  public String toString() {
    return "NotificationDb [userId=" + userId + ", text=" + text + ", time=" + time + ", seen="
        + seen + "]";
  }
  
}
