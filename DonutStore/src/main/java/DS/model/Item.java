package ds.model;

import java.io.Serializable;
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

@Entity
@Table(name = "item")
public class Item implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "item_id", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int itemId;
  @Column(name = "item_name")
  private String itemName;
  @Column(name = "item_date_created", nullable = false)
  private String itemDateCreated;
  @Column(name = "item_date_updated", nullable = false)
  private String itemDateUpdated;
  @Column(name = "item_single_value", nullable = false)
  private double iteamSingleValue;

  @ManyToMany
  @JoinTable(name = "item_material", joinColumns = @JoinColumn(name = "item_id"),
      inverseJoinColumns = @JoinColumn(name = "material_id"))
  private Set<Material> materials;

  public int getItemId() {
    return itemId;
  }

  public void setItemId(int itemId) {
    this.itemId = itemId;
  }

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public String getItemDateCreated() {
    return itemDateCreated;
  }

  public void setItemDateCreated(String itemDateCreated) {
    this.itemDateCreated = itemDateCreated;
  }

  public String getItemDateUpdated() {
    return itemDateUpdated;
  }

  public void setItemDateUpdated(String itemDateUpdated) {
    this.itemDateUpdated = itemDateUpdated;
  }

  public double getIteamSingleValue() {
    return iteamSingleValue;
  }

  public void setIteamSingleValue(double iteamSingleValue) {
    this.iteamSingleValue = iteamSingleValue;
  }

  public Set<Material> getMaterials() {
    return materials;
  }

  public void setMaterials(Set<Material> materials) {
    this.materials = materials;
  }

}
