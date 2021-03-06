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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "material")
public class Material implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "material_id", nullable = false)
  private int materialId;
  
  @Size(max = 10)
  @Column(name = "material_code", nullable = false, unique = true)
  private String materialCode;
  @Size(max = 255)
  @Column(name = "material_name", nullable = false)
  private String materialName;
  @Size(max = 255)
  @Column(name = "material_picture")
  private String materialPicture;
  @ManyToOne
  @JoinColumn(name = "supply_id", referencedColumnName = "supply_id", nullable = false)
  private Supply materialSupply;
  @Column(name = "material_date_created", nullable = false)
  private Date materialDateCreated;
  @Column(name = "material_date_updated", nullable = false)
  private Date materialDateUpdated;
  @Column(name = "material_single_value", nullable = false)
  private BigDecimal materialSingleValue;
  @Column(name = "material_status", nullable = true)
  private boolean materialStatus;

  @ManyToMany(mappedBy = "materials")
  @JsonIgnore
  private Set<Item> items;
  
  public String toString() {
    return this.materialName;
  }

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

  public String getMaterialPicture() {
    return materialPicture;
  }

  public void setMaterialPicture(String materialPicture) {
    this.materialPicture = materialPicture;
  }

  public Supply getMaterialSupply() {
    return materialSupply;
  }

  public void setMaterialSupply(Supply materialSupply) {
    this.materialSupply = materialSupply;
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

  public String getMaterialCode() {
    return materialCode;
  }

  public void setMaterialCode(String materialCode) {
    this.materialCode = materialCode;
  }

  public Set<Item> getItems() {
    return items;
  }

  public void setItems(Set<Item> items) {
    this.items = items;
  }

  public boolean isMaterialStatus() {
    return materialStatus;
  }

  public void setMaterialStatus(boolean materialStatus) {
    this.materialStatus = materialStatus;
  }

}
