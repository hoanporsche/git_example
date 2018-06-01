package ds.upgrade.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "room_db")
public class RoomDb implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;
  @Column(name = "name")
  private String name;
  @ManyToMany(mappedBy = "roomDbs" )
  private Set<SenderDb> senderDbs;
  @OneToMany(cascade = CascadeType.ALL, mappedBy = "roomDbId")
  @JsonIgnore
  private Set<MessageDb> messageDbs;
  
  public RoomDb() {}
  
  public RoomDb(String name) {
    this.name = name;
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

  public Set<SenderDb> getSenderDbs() {
    return senderDbs;
  }

  public void setSenderDbs(Set<SenderDb> senderDbs) {
    this.senderDbs = senderDbs;
  }

  public Set<MessageDb> getMessageDbs() {
    return messageDbs;
  }

  public void setMessageDbs(Set<MessageDb> messageDbs) {
    this.messageDbs = messageDbs;
  }

  @Override
  public String toString() {
    return "RoomDb [id=" + id + ", name=" + name + ", senderDbs=" + senderDbs + ", messageDbs="
        + messageDbs + "]";
  }
  
}
