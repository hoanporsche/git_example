package ds.upgrade.model.json;

import java.util.HashSet;
import java.util.Set;

import ds.upgrade.model.Role;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;

public class UserJson {

  private String email;
  private String picture;
  private String senderName;
  private Set<String> roles;
  private StoreJson storeId;

  public UserJson(User user) {
    this.setEmail(user.getEmail());
    this.setPicture(user.getPicture());
    this.setSenderName(user.getSenderDbId());
    this.setStoreId(new StoreJson(user.getStoreId()));
    this.setRoles(user.getRoles());
  }

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

  public void setSenderName(SenderDb senderDb) {
    if (senderDb != null)
      this.senderName = senderDb.getName();
  }

  public Set<String> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = new HashSet<>();
    for (Role role : roles) {
      this.roles.add(role.getName());
    }
  }

  public StoreJson getStoreId() {
    return storeId;
  }

  public void setStoreId(StoreJson storeId) {
    this.storeId = storeId;
  }

  @Override
  public String toString() {
    return "UserForm [email=" + email + ", picture=" + picture + ", senderName=" + senderName
        + ", roles=" + roles + ", storeId=" + storeId + "]";
  }

}
