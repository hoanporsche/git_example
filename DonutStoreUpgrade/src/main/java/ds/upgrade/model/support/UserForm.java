package ds.upgrade.model.support;

import java.util.Set;

public class UserForm {

  private String email;
  private String picture;
  private String senderName;
  private Set<String> roles;
  private Long storeId;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public String getSenderName() {
    return senderName;
  }

  public void setSenderName(String senderName) {
    this.senderName = senderName;
  }

  public Set<String> getRoles() {
    return roles;
  }

  public void setRoles(Set<String> roles) {
    this.roles = roles;
  }

  public Long getStoreId() {
    return storeId;
  }

  public void setStoreId(Long storeId) {
    this.storeId = storeId;
  }

  @Override
  public String toString() {
    return "UserForm [email=" + email + ", picture=" + picture + ", senderName=" + senderName
        + ", roles=" + roles + ", storeId=" + storeId + "]";
  }

}
