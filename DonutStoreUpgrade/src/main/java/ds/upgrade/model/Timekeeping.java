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
  @JoinColumn(name = "staff_id",referencedColumnName = "id", nullable = false)
  private Staff staffId;
  @Column(name = "date_created", nullable = false)
  private Date dateCreated;
  @Column(name = "time_in", nullable = true)
  private Date timeIn;
  @Column(name = "time_out", nullable = true)
  private Date timeOut;
  @ManyToOne
  @JoinColumn(name = "status_id", referencedColumnName = "id", nullable = false)
  private TimekeepingStatus statusId;
  
  public String toString() {
    return this.staffId.getName();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Staff getStaffId() {
    return staffId;
  }

  public void setStaffId(Staff staffId) {
    this.staffId = staffId;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getTimeIn() {
    return timeIn;
  }

  public void setTimeIn(Date timeIn) {
    this.timeIn = timeIn;
  }

  public Date getTimeOut() {
    return timeOut;
  }

  public void setTimeOut(Date timeOut) {
    this.timeOut = timeOut;
  }

  public TimekeepingStatus getStatusId() {
    return statusId;
  }

  public void setStatusId(TimekeepingStatus statusId) {
    this.statusId = statusId;
  }

}
