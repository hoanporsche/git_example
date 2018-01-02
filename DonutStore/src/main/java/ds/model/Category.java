package ds.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "category")
public class Category implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "category_id", nullable = false)
  private int categoryId;
  @Size(max = 10)
  @Column(name = "category_code", nullable = false)
  private String categoryCode;
  @Size(max = 255)
  @Column(name = "category_name", nullable = false)
  private String categoryName;
  @Column(name = "category_date_created", nullable = false)
  private Date categoryDateCreated;
  @Column(name = "category_date_updated", nullable = false)
  private Date categoryDateUpdated;
  @Column(name = "category_status", nullable = false)
  private boolean categoryStatus;

  @OneToMany(mappedBy = "itemCategory")
  @JsonIgnore
  private List<Item> items;
  
  public String toString() {
    return this.categoryName;
  }

  public int getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(int categoryId) {
    this.categoryId = categoryId;
  }

  public String getCategoryCode() {
    return categoryCode;
  }

  public void setCategoryCode(String categoryCode) {
    this.categoryCode = categoryCode;
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

  public boolean isCategoryStatus() {
    return categoryStatus;
  }

  public void setCategoryStatus(boolean categoryStatus) {
    this.categoryStatus = categoryStatus;
  }

  public List<Item> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = items;
  }
}
