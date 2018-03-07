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
import javax.validation.constraints.Size;

@Entity
@Table(name = "staff")
public class Staff implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "staff_id", nullable = false)
  private Long staffId;
  @Size(max = 255)
  @Column(name = "staff_name", nullable = false)
  private String staffName;
  @Size(max = 255)
  @Column(name = "staff_picture")
  private String staffPicture;
  @ManyToOne
  @JoinColumn(name = "staff_store", referencedColumnName = "store_id", nullable = false)
  private Store staffStore;
  @Column(name = "staff_created_time", nullable = false)
  private Date staffCreatedTime;
  @Column(name = "staff_updated_time", nullable = false)
  private Date staffUpdatedTime;
  @Size(max = 20)
  @Column(name = "staff_phone_number", nullable = false)
  private String staffPhoneNumber;
  @Size(max = 255)
  @Column(name = "staff_address", nullable = false)
  private String staffAddress;
  @Size(max = 12)
  @Column(name = "staff_identity_card", nullable = false)
  private String staffIdentityCard;
  @Size(max = 255)
  @Column(name = "staff_home_town", nullable = false)
  private String staffHomeTown;
  @Column(name = "staff_salary", nullable = false)
  private BigDecimal staffSalary;
  @ManyToOne
  @JoinColumn(name = "working_calender_id", referencedColumnName = "id", nullable = false)
  private WorkingCalender workingCalenderId;
  @Column(name = "staff_enabled", nullable = false)
  private boolean staffEnabled;
  
  @OneToMany(cascade = CascadeType.ALL,mappedBy = "staff")
  private List<Timekeeping> timekeepings;
  
  public Staff() {}
  
  public Staff(Long id) {
    this.staffId = id;
  }
  
  public String toString() {
    return this.staffName;
  }

  public Long getStaffId() {
    return staffId;
  }

  public void setStaffId(Long staffId) {
    this.staffId = staffId;
  }

  public String getStaffName() {
    return staffName;
  }

  public void setStaffName(String staffName) {
    this.staffName = staffName;
  }

  public String getStaffPicture() {
    return staffPicture;
  }

  public void setStaffPicture(String staffPicture) {
    this.staffPicture = staffPicture;
  }

  public Store getStaffStore() {
    return staffStore;
  }

  public void setStaffStore(Store staffStore) {
    this.staffStore = staffStore;
  }

  public Date getStaffCreatedTime() {
    return staffCreatedTime;
  }

  public void setStaffCreatedTime(Date staffCreatedTime) {
    this.staffCreatedTime = staffCreatedTime;
  }

  public Date getStaffUpdatedTime() {
    return staffUpdatedTime;
  }

  public void setStaffUpdatedTime(Date staffUpdatedTime) {
    this.staffUpdatedTime = staffUpdatedTime;
  }

  public String getStaffPhoneNumber() {
    return staffPhoneNumber;
  }

  public void setStaffPhoneNumber(String staffPhoneNumber) {
    this.staffPhoneNumber = staffPhoneNumber;
  }

  public String getStaffAddress() {
    return staffAddress;
  }

  public void setStaffAddress(String staffAddress) {
    this.staffAddress = staffAddress;
  }

  public String getStaffIdentityCard() {
    return staffIdentityCard;
  }

  public void setStaffIdentityCard(String staffIdentityCard) {
    this.staffIdentityCard = staffIdentityCard;
  }

  public String getStaffHomeTown() {
    return staffHomeTown;
  }

  public void setStaffHomeTown(String staffHomeTown) {
    this.staffHomeTown = staffHomeTown;
  }
  
  public BigDecimal getStaffSalary() {
    return staffSalary;
  }

  public void setStaffSalary(BigDecimal staffSalary) {
    this.staffSalary = staffSalary;
  }

  public boolean isStaffEnabled() {
    return staffEnabled;
  }

  public void setStaffEnabled(boolean staffEnabled) {
    this.staffEnabled = staffEnabled;
  }

  public List<Timekeeping> getTimekeepings() {
    return timekeepings;
  }

  public void setTimekeepings(List<Timekeeping> timekeepings) {
    this.timekeepings = timekeepings;
  }

  public WorkingCalender getWorkingCalenderId() {
    return workingCalenderId;
  }

  public void setWorkingCalenderId(WorkingCalender workingCalenderId) {
    this.workingCalenderId = workingCalenderId;
  }
  
}
