package ds.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.math.BigDecimal;
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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "item")
public class Item implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "item_id", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int itemId;
  @Size(max = 10)
  @Column(name = "item_code", nullable = false, unique = true)
  private String itemCode;
  @Size(max = 255)
  @Column(name = "item_name", nullable = false)
  private String itemName;
  @Size(max = 255)
  @Column(name = "item_picture")
  private String itemPicture;
  @ManyToOne
  @JoinColumn(name = "category_id", referencedColumnName = "category_id",nullable = false)
  @JsonIgnore
  private Category itemCategory;
  @Column(name = "item_date_created", nullable = false)
  private Date itemDateCreated;
  @Column(name = "item_date_updated", nullable = false)
  private Date itemDateUpdated;
  @Column(name = "item_single_value", nullable = false)
  private BigDecimal itemSingleValue;
  @Column(name = "item_status", nullable = false)
  private boolean itemStatus;

  @ManyToMany
  @JoinTable(name = "item_material", joinColumns = @JoinColumn(name = "item_id"),
      inverseJoinColumns = @JoinColumn(name = "material_id"))
  @JsonIgnore
  private Set<Material> materials;
  
  @ManyToMany(mappedBy = "items")
  @JsonIgnore
  private Set<Store> stores;

  public String toString() {
    return this.itemName;
  }
  
  public int getItemId() {
    return itemId;
  }

  public void setItemId(int itemId) {
    this.itemId = itemId;
  }

  public String getItemCode() {
    return itemCode;
  }

  public void setItemCode(String itemCode) {
    this.itemCode = itemCode;
  }

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public String getItemPicture() {
    return itemPicture;
  }

  public void setItemPicture(String itemPicture) {
    this.itemPicture = itemPicture;
  }

  public Category getItemCategory() {
    return itemCategory;
  }

  public void setItemCategory(Category itemCategory) {
    this.itemCategory = itemCategory;
  }

  public Set<Store> getStores() {
    return stores;
  }

  public void setStores(Set<Store> stores) {
    this.stores = stores;
  }

  public Date getItemDateCreated() {
    return itemDateCreated;
  }

  public void setItemDateCreated(Date itemDateCreated) {
    this.itemDateCreated = itemDateCreated;
  }

  public Date getItemDateUpdated() {
    return itemDateUpdated;
  }

  public void setItemDateUpdated(Date itemDateUpdated) {
    this.itemDateUpdated = itemDateUpdated;
  }

  public BigDecimal getItemSingleValue() {
    return itemSingleValue;
  }

  public void setItemSingleValue(BigDecimal itemSingleValue) {
    this.itemSingleValue = itemSingleValue;
  }

  public Set<Material> getMaterials() {
    return materials;
  }

  public void setMaterials(Set<Material> materials) {
    this.materials = materials;
  }

  public boolean isItemStatus() {
    return itemStatus;
  }

  public void setItemStatus(boolean itemStatus) {
    this.itemStatus = itemStatus;
  }
  
}
