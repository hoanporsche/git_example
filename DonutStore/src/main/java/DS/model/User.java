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
  @Column(name = "user_name", nullable = false, unique = true)
  private String userName;

  @NotEmpty
  @Column(name = "name", nullable = false)
  private String name;

  @NotEmpty
  @Column(name = "user_password", nullable = false)
  private String userPassword;

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

  @NotEmpty
  @Email
  @Column(name = "user_email")
  private String userEmail;
  @NotEmpty
  @Column(name = "user_phone_number")
  private String userPhoneNumber;
  @NotEmpty
  @Column(name = "user_address")
  private String userAddress;
  @Column(name = "user_created_time")
  private Date userCreateTime;
  @Column(name = "user_updated_time")
  private Date userUpdateTime;
  @Column(name = "user_last_order_time")
  private String userLastOrderTime;

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

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public Date getUserCreateTime() {
    return userCreateTime;
  }

  public void setUserCreateTime(Date userCreateTime) {
    this.userCreateTime = userCreateTime;
  }

  public Date getUserUpdateTime() {
    return userUpdateTime;
  }

  public void setUserUpdateTime(Date userUpdateTime) {
    this.userUpdateTime = userUpdateTime;
  }

  public String getUserLastOrderTime() {
    return userLastOrderTime;
  }

  public void setUserLastOrderTime(String userLastOrderTime) {
    this.userLastOrderTime = userLastOrderTime;
  }
}