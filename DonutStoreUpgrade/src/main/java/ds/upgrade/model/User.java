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
  @Column(name = "id", nullable = false)
  private Long id;

  @NotEmpty
  @Size(max = 255)
  @Column(name = "username", nullable = false)
  private String username;
  
  @NotEmpty
  @Size(max = 255)
  @Email
  @Column(name = "email",nullable = false, unique = true)
  private String email;

  @NotEmpty
  @Size(max = 60)
  @Column(name = "password", nullable = false)
  private String password;

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;
  
  @Size(max = 20)
  @Column(name = "phone")
  private String phone;
  @Size(max = 255)
  @Column(name = "address")
  private String address;
  @Column(name = "date_created")
  private Date dateCreated;
  @Column(name = "date_updated")
  private Date dateUpdated;
  @Column(name = "last_order_time")
  private Date lastOrderTime;
  @NotNull
  @Column(name = "enabled")
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
  @JoinColumn(name = "storeId", referencedColumnName = "id")
  private Store storeId;
  
  public User() {}
  
  public String toString() {
    return this.username;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
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

  public Date getLastOrderTime() {
    return lastOrderTime;
  }

  public void setLastOrderTime(Date lastOrderTime) {
    this.lastOrderTime = lastOrderTime;
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

  public Store getStoreId() {
    return storeId;
  }

  public void setStoreId(Store storeId) {
    this.storeId = storeId;
  }
}