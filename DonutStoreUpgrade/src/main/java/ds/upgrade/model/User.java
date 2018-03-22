package ds.upgrade.model;

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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "user")
public class User implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id", nullable = false)
  private Long userId;

  @NotEmpty
  @Size(max = 255)
  @Column(name = "user_name", nullable = false)
  private String userName;
  
  @NotEmpty
  @Size(max = 255)
  @Email
  @Column(name = "user_email",nullable = false, unique = true)
  private String userEmail;

  @NotEmpty
  @Size(max = 60)
  @Column(name = "user_password", nullable = false)
  private String userPassword;

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;
  
  @Size(max = 20)
  @Column(name = "user_phone_number")
  private String userPhoneNumber;
  @Size(max = 255)
  @Column(name = "user_address")
  private String userAddress;
  @Column(name = "user_date_created")
  private Date userDateCreated;
  @Column(name = "user_date_updated")
  private Date userDateUpdated;
  @Column(name = "user_last_order_time")
  private Date userLastOrderTime;
  @NotNull
  @Column(name = "user_enabled")
  private boolean enabled = true;
  @NotNull
  @Column(name = "credentialsexpired")
  private boolean credentialsexpired = false;
  @NotNull
  @Column(name = "expired")
  private boolean expired = false;
  @NotNull
  @Column(name = "locked")
  private boolean locked = false;
  @OneToOne
  @JoinColumn(name = "user_store", referencedColumnName = "store_id")
  private Store userStore;
  
  public User() {}

  public User(Long id) {
    this.userId = id;
  }
  
  /** .
   * @description: 
   * @author: VDHoan
   * @date_created: Mar 5, 2018
   * @param user .
   */
  public User(User user) {
    this.userId = user.getUserId();
    this.userEmail = user.getUserEmail();
    this.userPassword = user.getUserPassword();
    this.enabled = user.isEnabled();
    this.credentialsexpired = user.isCredentialsexpired();
    this.locked = user.isExpired();
    this.roles = user.getRoles();
  }
  
  public String toString() {
    return this.userName;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
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

  public Date getUserLastOrderTime() {
    return userLastOrderTime;
  }

  public void setUserLastOrderTime(Date userLastOrderTime) {
    this.userLastOrderTime = userLastOrderTime;
  }

  public Store getUserStore() {
    return userStore;
  }

  public void setUserStore(Store userStore) {
    this.userStore = userStore;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public boolean isCredentialsexpired() {
    return credentialsexpired;
  }

  public void setCredentialsexpired(boolean credentialsexpired) {
    this.credentialsexpired = credentialsexpired;
  }

  public boolean isExpired() {
    return expired;
  }

  public void setExpired(boolean expired) {
    this.expired = expired;
  }

  public boolean isLocked() {
    return locked;
  }

  public void setLocked(boolean locked) {
    this.locked = locked;
  }
  
}