
package ds.upgrade.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

@Entity
@Table(name = "category")
public class Category implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "category_id", nullable = false)
  private Long categoryId;
  @NotEmpty
  @Size(min = 10,max = 255)
  @Column(name = "category_name", nullable = false)
  private String categoryName;
  @Column(name = "category_date_created", nullable = false)
  private Date categoryDateCreated;
  @Column(name = "category_date_updated", nullable = false)
  private Date categoryDateUpdated;
  @Column(name = "category_enabled", nullable = false)
  private boolean categoryEnabled;

  @OneToMany(cascade = CascadeType.ALL,mappedBy = "itemCategory")
  @JsonIgnore
  private List<Item> items;
  
  public Category() {}
  
  public Category(Long id) {
    this.categoryId = id;
  }
  
  public String toString() {
    return this.categoryName;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public Date getCategoryDateCreated() {
    return categoryDateCreated;
  }

  public void setCategoryDateCreated(Date categoryDateCreated) {
    this.categoryDateCreated = categoryDateCreated;
  }

  public Date getCategoryDateUpdated() {
    return categoryDateUpdated;
  }

  public void setCategoryDateUpdated(Date categoryDateUpdated) {
    this.categoryDateUpdated = categoryDateUpdated;
  }

  public List<Item> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = items;
  }

  public boolean isCategoryEnabled() {
    return categoryEnabled;
  }

  public void setCategoryEnabled(boolean categoryEnabled) {
    this.categoryEnabled = categoryEnabled;
  }
}
