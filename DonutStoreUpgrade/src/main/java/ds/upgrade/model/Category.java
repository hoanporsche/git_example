
package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "category")
public class Category implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "code", nullable = false, unique = true)
  private String code;
  @NotEmpty
  @Size(max = 20)
  @Column(name = "name", nullable = false, unique = true)
  private String name;
  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_created", nullable = false)
  private Date dateCreated;
  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_updated", nullable = false)
  private Date dateUpdated;
  @Size(max = 255)
  @Column(name = "picture", nullable = false)
  private String picture;
  @Column(name = "enabled", nullable = false)
  private boolean enabled;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryId")
  @JsonIgnore
  private List<Item> items;

  public Category() {
  }

  public Category(Long id) {
    this.id = id;
  }

  public String toString() {
    return this.name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public List<Item> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = items;
  }

}
