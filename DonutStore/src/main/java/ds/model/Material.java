package ds.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "material")
public class Material implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "material_id", nullable = false)
  private int materialId;
  @Column(name = "material_name", nullable = false)
  private String materialName;
  @Column(name = "material_date_created", nullable = false)
  private Date materialDateCreated;
  @Column(name = "material_date_updated", nullable = false)
  private Date materialDateUpdated;
  @Column(name = "material_single_value", nullable = false)
  private BigDecimal materialSingleValue;
  @Column(name = "material_remain", nullable = false)
  private String materialRemain;
  @Column(name = "material_supply_name", nullable = true)
  private String materialSupplyName;
  @Column(name = "material_supply_phone", nullable = true)
  private String materialSupplyPhone;

  @ManyToMany(mappedBy = "materials")
  private Set<Item> items;

  public int getMaterialId() {
    return materialId;
  }

  public void setMaterialId(int materialId) {
    this.materialId = materialId;
  }

  public String getMaterialName() {
    return materialName;
  }

  public void setMaterialName(String materialName) {
    this.materialName = materialName;
  }

  public Date getMaterialDateCreated() {
    return materialDateCreated;
  }

  public void setMaterialDateCreated(Date materialDateCreated) {
    this.materialDateCreated = materialDateCreated;
  }

  public Date getMaterialDateUpdated() {
    return materialDateUpdated;
  }

  public void setMaterialDateUpdated(Date materialDateUpdated) {
    this.materialDateUpdated = materialDateUpdated;
  }

  public BigDecimal getMaterialSingleValue() {
    return materialSingleValue;
  }

  public void setMaterialSingleValue(BigDecimal materialSingleValue) {
    this.materialSingleValue = materialSingleValue;
  }

  public String getMaterialRemain() {
    return materialRemain;
  }

  public void setMaterialRemain(String materialRemain) {
    this.materialRemain = materialRemain;
  }

  public String getMaterialSupplyName() {
    return materialSupplyName;
  }

  public void setMaterialSupplyName(String materialSupplyName) {
    this.materialSupplyName = materialSupplyName;
  }

  public String getMaterialSupplyPhone() {
    return materialSupplyPhone;
  }

  public void setMaterialSupplyPhone(String materialSupplyPhone) {
    this.materialSupplyPhone = materialSupplyPhone;
  }

  public Set<Item> getItems() {
    return items;
  }

  public void setItems(Set<Item> items) {
    this.items = items;
  }

}
