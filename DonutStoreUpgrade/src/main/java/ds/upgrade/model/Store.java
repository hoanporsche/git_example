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

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "store")
public class Store implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "code", nullable = false, unique = true)
  private String code;
  @NotEmpty
  @Size(max = 20)
  @Column(name = "name", nullable = false, unique = true)
  private String name;
  @NotEmpty
  @Size(max = 255)
  @Column(name = "picture")
  private String picture;
  @NotEmpty
  @Size(max = 20)
  @Column(name = "phone", nullable = false)
  private String phone;
  @NotEmpty
  @Size(max = 255)
  @Column(name = "address", nullable = false)
  private String address;
  @Size(max = 20)
  @Column(name = "lat")
  private String lat;
  @Size(max = 20)
  @Column(name = "lng")
  private String lng;

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

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
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

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getLat() {
    return lat;
  }

  public void setLat(String lat) {
    this.lat = lat;
  }

  public String getLng() {
    return lng;
  }

  public void setLng(String lng) {
    this.lng = lng;
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
