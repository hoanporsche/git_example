package ds.upgrade.model;

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
@Table(name = "timekeeping")
public class Timekeeping implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  @ManyToOne
  @JoinColumn(name = "staff_id",referencedColumnName = "staff_id", nullable = false)
  private Staff staff;
  @Column(name = "timekeeping_created_date", nullable = false)
  private Date timekeepingCreatedDate;
  @Column(name = "timekeeping_in", nullable = true)
  private Date timekeepingIn;
  @Column(name = "timekeeping_out", nullable = true)
  private Date timekeepingOut;
  @Column(name = "timekeeping_status", nullable = false)
  private boolean timekeepingStatus;
  
  public String toString() {
    return this.staff.getStaffName();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Staff getStaff() {
    return staff;
  }

  public void setStaff(Staff staff) {
    this.staff = staff;
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

  public boolean getTimekeepingStatus() {
    return timekeepingStatus;
  }

  public void setTimekeepingStatus(boolean timekeepingStatus) {
    this.timekeepingStatus = timekeepingStatus;
  }

}
