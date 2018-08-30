package ds.upgrade.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "staff")
public class Staff implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  @NotEmpty
  @Size(max = 20)
  @Column(name = "name", nullable = false)
  private String name;
  @Size(max = 255)
  @Column(name = "picture")
  private String picture;

  @ManyToOne
  @JoinColumn(name = "store_id", referencedColumnName = "id")
  private Store storeId;
  
  @Column(name = "date_created", nullable = false)
  private Date dateCreated;
  
  @Column(name = "date_updated", nullable = false)
  private Date dateUpdated;
  @NotEmpty
  @Size(max = 20)
  @Column(name = "phone", nullable = false)
  private String phone;
  @NotEmpty
  @Size(max = 255)
  @Column(name = "address", nullable = false)
  private String address;
  @NotEmpty
  @Size(max = 12)
  @Column(name = "identity_card", nullable = false, unique = true)
  private String identityCard;
  @NotEmpty
  @Size(max = 255)
  @Column(name = "home_town", nullable = false)
  private String homeTown;
  @Max(100000000)
  @Column(name = "salary", nullable = false)
  private BigDecimal salary;
  
  @ManyToOne
  @JoinColumn(name = "working_calender_id", referencedColumnName = "id", nullable = false)
  private WorkingCalender workingCalenderId;
  
  @Column(name = "enabled", nullable = false)
  private boolean enabled;
  
  @OneToMany(cascade = CascadeType.ALL,mappedBy = "staffId")
  @JsonIgnore
  private List<Timekeeping> timekeepings;
  
  public Staff() {}
  
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

  public Store getStoreId() {
    return storeId;
  }

  public void setStoreId(Store storeId) {
    this.storeId = storeId;
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

  public String getIdentityCard() {
    return identityCard;
  }

  public void setIdentityCard(String identityCard) {
    this.identityCard = identityCard;
  }

  public String getHomeTown() {
    return homeTown;
  }

  public void setHomeTown(String homeTown) {
    this.homeTown = homeTown;
  }

  public BigDecimal getSalary() {
    return salary;
  }

  public void setSalary(BigDecimal salary) {
    this.salary = salary;
  }

  public WorkingCalender getWorkingCalenderId() {
    return workingCalenderId;
  }

  public void setWorkingCalenderId(WorkingCalender workingCalenderId) {
    this.workingCalenderId = workingCalenderId;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public List<Timekeeping> getTimekeepings() {
    return timekeepings;
  }

  public void setTimekeepings(List<Timekeeping> timekeepings) {
    this.timekeepings = timekeepings;
  }

}
