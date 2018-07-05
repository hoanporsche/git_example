package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "sender_db")
public class SenderDb implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  @JsonIgnore
  private Long id;
  @Column(name = "name")
  private String name;
  @Column(name = "phone")
  private String phone;
  @Column(name = "last_connect")
  private Date lastConnect;
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User userId;
  @OneToMany(cascade = CascadeType.ALL, mappedBy = "senderDbId")
  @JsonIgnore
  private Set<MessageDb> messageDbs;
  @ManyToMany(mappedBy = "senderDbs")
  @JsonIgnore
  private Set<RoomDb> roomDbs;
  
  public SenderDb() {}
  
  public SenderDb(Long id) {
    this.id = id;
  }
  
  public SenderDb(String name, String phone) {
    this.name = name;
    this.phone = phone;
    this.lastConnect = new Date();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Date getLastConnect() {
    return lastConnect;
  }

  public void setLastConnect(Date lastConnect) {
    this.lastConnect = lastConnect;
  }

  public User getUserId() {
    return userId;
  }

  public void setUserId(User userId) {
    this.userId = userId;
  }

  public Set<MessageDb> getMessageDbs() {
    return messageDbs;
  }

  public void setMessageDbs(Set<MessageDb> messageDbs) {
    this.messageDbs = messageDbs;
  }

  public Set<RoomDb> getRoomDbs() {
    return roomDbs;
  }

  public void setRoomDbs(Set<RoomDb> roomDbs) {
    this.roomDbs = roomDbs;
  }

  @Override
  public String toString() {
    return "SenderDb [name=" + name + ", phone=" + phone + ", lastConnect=" + lastConnect + "]";
  }
  
}
