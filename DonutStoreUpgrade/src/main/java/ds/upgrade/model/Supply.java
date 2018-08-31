package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "supply")
public class Supply implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "name", nullable = false, unique = true)
  @NotEmpty
  @Size(min = 2, max = 40)
  private String name;

  @Column(name = "phone", nullable = false)
  @NotEmpty
  @Size(min = 10, max = 20)
  private String phone;

  @Column(name = "address", nullable = false)
  @NotEmpty
  @Size(min = 2, max = 60)
  private String address;
  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_created", nullable = false)
  private Date dateCreated;
  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_updated", nullable = false)
  private Date dateUpdated;

  @Column(name = "enabled", nullable = false)
  private boolean enabled;

  public Supply() {
  }

  public Supply(Long id) {
    super();
    this.id = id;
  }

  public String toString() {
    return this.name;
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

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateUpdated() {
    return dateUpdated;
  }

  public void setDateUpdated(Date dateUpdated) {
    this.dateUpdated = dateUpdated;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }
}
