package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sender_db")
public class SenderDb implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;
  @Column(name = "name")
  private String name;
  @Column(name = "phone")
  private String phone;
  @Column(name = "last_connect")
  private Date lastConnect;
  
  public SenderDb() {}
  
  public SenderDb(String name, String phone) {
    this.name = name;
    this.phone = phone;
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

  @Override
  public String toString() {
    return "SenderDb [id=" + id + ", name=" + name + ", phone=" + phone + ", lastConnect="
        + lastConnect + "]";
  }
  
}
