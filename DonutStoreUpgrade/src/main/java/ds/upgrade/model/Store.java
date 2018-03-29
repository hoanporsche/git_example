package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "store")
public class Store implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;

  @Size(max = 255)
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Size(max = 1000)
  @Column(name = "picture")
  private String picture;

  @Size(max = 20)
  @Column(name = "phone", nullable = false)
  private String phone;

  @Size(max = 255)
  @Column(name = "address", nullable = false)
  private String address;

  @Column(name = "date_created")
  private Date dateCreated;

  @Column(name = "date_updated")
  private Date dateUpdated;

  @Column(name = "enabled", nullable = false)
  private boolean enabled;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "storeId")
  @JsonIgnore
  private List<Staff> staffs;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "storeId")
  @JsonIgnore
  private List<MaterialDailyReport> reports;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "storeId")
  @JsonIgnore
  private List<Order> orders;

  public Store() {
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

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getPddress() {
    return address;
  }

  public void setPddress(String address) {
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

  public List<Staff> getStaffs() {
    return staffs;
  }

  public void setStaffs(List<Staff> staffs) {
    this.staffs = staffs;
  }

  public List<MaterialDailyReport> getReports() {
    return reports;
  }

  public void setReports(List<MaterialDailyReport> reports) {
    this.reports = reports;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }

}
