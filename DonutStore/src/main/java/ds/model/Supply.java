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

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "supply")
public class Supply implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "supply_id", nullable = false)
  private int supplyId;
  @Column(name = "supply_code", nullable = false)
  @Size(max = 10)
  private String supplyCode;
  @Column(name = "supply_name", nullable = false)
  @NotEmpty
  @Size(min = 10, max = 255)
  private String supplyName;
  @Column(name = "supply_phone", nullable = false)
  @NotEmpty
  @Size(min = 10, max = 20)
  private String supplyPhone;
  @Column(name = "supply_address", nullable = false)
  @NotEmpty
  @Size(min = 10, max = 255)
  private String supplyAddress;
  @Column(name = "supply_date_created", nullable = false)
  private Date supplyDateCreated;
  @Column(name = "supply_date_updated", nullable = false)
  private Date supplyDateUpdated;
  @Column(name = "supply_status", nullable = false)
  private boolean supplyStatus;
  
  @OneToMany(mappedBy = "materialSupply")
  @JsonIgnore
  private List<Material> materials;
  
  public String toString() {
    return this.supplyName + "," + this.supplyAddress;
  }

  public int getSupplyId() {
    return supplyId;
  }

  public void setSupplyId(int supplyId) {
    this.supplyId = supplyId;
  }

  public String getSupplyCode() {
    return supplyCode;
  }

  public void setSupplyCode(String supplyCode) {
    this.supplyCode = supplyCode;
  }

  public String getSupplyName() {
    return supplyName;
  }

  public void setSupplyName(String supplyName) {
    this.supplyName = supplyName;
  }

  public String getSupplyPhone() {
    return supplyPhone;
  }

  public void setSupplyPhone(String supplyPhone) {
    this.supplyPhone = supplyPhone;
  }

  public String getSupplyAddress() {
    return supplyAddress;
  }

  public void setSupplyAddress(String supplyAddress) {
    this.supplyAddress = supplyAddress;
  }

  public Date getSupplyDateCreated() {
    return supplyDateCreated;
  }

  public void setSupplyDateCreated(Date supplyDateCreated) {
    this.supplyDateCreated = supplyDateCreated;
  }

  public Date getSupplyDateUpdated() {
    return supplyDateUpdated;
  }

  public void setSupplyDateUpdated(Date supplyDateUpdated) {
    this.supplyDateUpdated = supplyDateUpdated;
  }

  public boolean isSupplyStatus() {
    return supplyStatus;
  }

  public void setSupplyStatus(boolean supplyStatus) {
    this.supplyStatus = supplyStatus;
  }

  public List<Material> getMaterials() {
    return materials;
  }

  public void setMaterials(List<Material> materials) {
    this.materials = materials;
  }
}
