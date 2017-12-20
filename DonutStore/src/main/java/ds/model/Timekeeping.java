package ds.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "timekeeping")
public class Timekeeping implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;
  @Column(name = "staff_id", nullable = false)
  private Staff staffId;
  @Column(name = "timekeeping_created_date", nullable = false)
  private Date timekeepingCreatedDate;
  @Column(name = "timekeeping_in", nullable = true)
  private Date timekeepingIn;
  @Column(name = "timekeeping_out", nullable = true)
  private Date timekeepingOut;
  @Column(name = "timekeeping_status", nullable = false)
  private byte timekeepingStatus;
  
  public String toString() {
    return this.staffId.getStaffName();
  }

  public long getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Staff getStaffId() {
    return staffId;
  }

  public void setStaffId(Staff staffId) {
    this.staffId = staffId;
  }

  public Date getTimekeepingCreatedDate() {
    return timekeepingCreatedDate;
  }

  public void setTimekeepingCreatedDate(Date timekeepingCreatedDate) {
    this.timekeepingCreatedDate = timekeepingCreatedDate;
  }

  public Date getTimekeepingIn() {
    return timekeepingIn;
  }

  public void setTimekeepingIn(Date timekeepingIn) {
    this.timekeepingIn = timekeepingIn;
  }

  public Date getTimekeepingOut() {
    return timekeepingOut;
  }

  public void setTimekeepingOut(Date timekeepingOut) {
    this.timekeepingOut = timekeepingOut;
  }

  public int getTimekeepingStatus() {
    return timekeepingStatus;
  }

  public void setTimekeepingStatus(byte timekeepingStatus) {
    this.timekeepingStatus = timekeepingStatus;
  }

}
