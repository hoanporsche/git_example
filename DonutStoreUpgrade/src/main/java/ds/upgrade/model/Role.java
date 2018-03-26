package ds.upgrade.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "role")
public class Role implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "role_id", nullable = false)
  private Long roleId;
  
  @NotEmpty
  @Size(max = 255)
  @Column(name = "role_name", nullable = false)
  private String roleName;
  
  @Column(name = "role_enabled", nullable = false)
  private boolean roleEnabled;
  
  @ManyToMany(mappedBy = "roles")
  @JsonIgnore
  private Set<User> users;
  
  public Role() {}
  
  public Role(Long id) {
    this.roleId = id;
  }
  
  public String toString() {
    return this.roleName;
  }

  public Role(String name) {
    this.roleName = name;
  }

  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }

  public String getRoleName() {
    return roleName;
  }

  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }

  public boolean isRoleEnabled() {
    return roleEnabled;
  }

  public void setRoleEnabled(boolean roleEnabled) {
    this.roleEnabled = roleEnabled;
  }

  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }

}
