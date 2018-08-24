package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  @NotEmpty
  @Size(max = 100)
  @Email
  @Column(name = "email",nullable = false, unique = true)
  private String email;

  @NotEmpty
  @Size(max = 60)
  @Column(name = "password", nullable = false)
  private String password;
  @NotNull
  @Column(name = "picture")
  private String picture;

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;
  @Column(name = "date_created")
  private Date dateCreated;
  @Column(name = "date_updated")
  private Date dateUpdated;
  @NotNull
  @Column(name = "enabled")
  private boolean enabled = true;
  @OneToOne
  @JoinColumn(name = "storeId", referencedColumnName = "id")
  private Store storeId;
  
  @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
  @JsonIgnore
  private List<NotificationDb> notifications;
  
  @OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, 
              fetch = FetchType.LAZY, optional = false)
  private SenderDb senderDbId;
  
  @Transient
  private String oldPassword;
  @Transient
  private String newPassword;
  
  public User() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
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

  public String getOldPassword() {
    return oldPassword;
  }

  public void setOldPassword(String oldPassword) {
    this.oldPassword = oldPassword;
  }

  public String getNewPassword() {
    return newPassword;
  }

  public void setNewPassword(String newPassword) {
    this.newPassword = newPassword;
  }

  public List<NotificationDb> getNotifications() {
    return notifications;
  }

  public void setNotifications(List<NotificationDb> notifications) {
    this.notifications = notifications;
  }

  public SenderDb getSenderDbId() {
    return senderDbId;
  }

  public void setSenderDbId(SenderDb senderDbId) {
    this.senderDbId = senderDbId;
  }

  @Override
  public String toString() {
    return "User [id=" + id + ", email=" + email + "]";
  }
  
}