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
@Table(name = "supply")
public class Supply implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "supply_id", nullable = false)
  private Long supplyId;
  
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
  
  @Column(name = "supply_enabled", nullable = false)
  private boolean supplyEnabled;
  
  @OneToMany(cascade = CascadeType.ALL,mappedBy = "materialSupply")
  @JsonIgnore
  private List<Material> materials;
  
  public Supply() {}
  
  public Supply(Long id) {
    this.supplyId = id;
  }
  
  public String toString() {
    return this.supplyName + "," + this.supplyAddress;
  }

  public Long getSupplyId() {
    return supplyId;
  }

  public void setSupplyId(Long supplyId) {
    this.supplyId = supplyId;
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

  public List<Material> getMaterials() {
    return materials;
  }

  public void setMaterials(List<Material> materials) {
    this.materials = materials;
  }

  public boolean isSupplyEnabled() {
    return supplyEnabled;
  }

  public void setSupplyEnabled(boolean supplyEnabled) {
    this.supplyEnabled = supplyEnabled;
  }
  
}
