package ds.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "user")
public class User implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id", nullable = false)
  private int userId;

  @NotEmpty
  @Column(name = "user_name", nullable = false)
  private String userName;

  @NotEmpty
  @Column(name = "user_password", nullable = false, unique = true)
  private String userPassword;

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

  @NotEmpty
  @Email
  @Column(name = "user_email",nullable = false, unique = true)
  private String userEmail;
  
  @Column(name = "user_phone_number")
  private String userPhoneNumber;
  @Column(name = "user_address")
  private String userAddress;
  @Column(name = "user_date_created")
  private Date userDateCreated;
  @Column(name = "user_date_updated")
  private Date userDateUpdated;
  @Column(name = "user_last_order_time")
  private String userLastOrderTime;
  @Column(name = "user_status",nullable = false)
  private boolean userStatus;
  @OneToOne
  @JoinColumn(name = "user_store", referencedColumnName = "store_id")
  private Store userStore;
  
  public User() {}

  public User(Date created, Date updated) {
    this.userDateCreated = created;
    this.userDateUpdated = updated;
  }
  
  public String toString() {
    return this.userName;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  public String getUserPhoneNumber() {
    return userPhoneNumber;
  }

  public void setUserPhoneNumber(String userPhoneNumber) {
    this.userPhoneNumber = userPhoneNumber;
  }

  public String getUserAddress() {
    return userAddress;
  }

  public void setUserAddress(String userAddress) {
    this.userAddress = userAddress;
  }

  public Date getUserDateCreated() {
    return userDateCreated;
  }

  public void setUserDateCreated(Date userDateCreated) {
    this.userDateCreated = userDateCreated;
  }

  public Date getUserDateUpdated() {
    return userDateUpdated;
  }

  public void setUserDateUpdated(Date userDateUpdated) {
    this.userDateUpdated = userDateUpdated;
  }

  public String getUserLastOrderTime() {
    return userLastOrderTime;
  }

  public void setUserLastOrderTime(String userLastOrderTime) {
    this.userLastOrderTime = userLastOrderTime;
  }

  public boolean isUserStatus() {
    return userStatus;
  }

  public void setUserStatus(boolean userStatus) {
    this.userStatus = userStatus;
  }

  public Store getUserStore() {
    return userStore;
  }

  public void setUserStore(Store userStore) {
    this.userStore = userStore;
  }
  
}