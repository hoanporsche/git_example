package ds.model;

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

@Entity
@Table(name = "staff")
public class Staff implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "staff_id", nullable = false)
  private int staffId;

  @Column(name = "staff_name", nullable = false)
  private String staffName;
  @ManyToOne
  @JoinColumn(name = "staff_store", referencedColumnName = "store_id", nullable = false)
  private Store staffStore;
  @Column(name = "staff_created_time", nullable = false)
  private Date staffCreatedTime;
  @Column(name = "staff_updated_time", nullable = false)
  private Date staffUpdatedTime;
  @Column(name = "staff_phone_number", nullable = false)
  private String staffPhoneNumber;
  @Column(name = "staff_address", nullable = false)
  private String staffAddress;
  @Column(name = "staff_identity_card", nullable = false)
  private String staffIdentityCard;
  @Column(name = "staff_home_town", nullable = false)
  private String staffHomeTown;
  @Column(name = "staff_salary", nullable = false)
  private double staffSalary;
  
  @Column(name = "staff_status", nullable = false)
  private boolean staffStatus;
  
  public String toString() {
    return this.staffName;
  }

  public int getStaffId() {
    return staffId;
  }

  public void setStaffId(int staffId) {
    this.staffId = staffId;
  }

  public String getStaffName() {
    return staffName;
  }

  public void setStaffName(String staffName) {
    this.staffName = staffName;
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
  
  public double getStaffSalary() {
    return staffSalary;
  }

  public void setStaffSalary(double staffSalary) {
    this.staffSalary = staffSalary;
  }

  public boolean getStaffStatus() {
    return staffStatus;
  }

  public void setStaffStatus(boolean staffStatus) {
    this.staffStatus = staffStatus;
  }
  
}
