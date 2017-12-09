package ds.form;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

public class MaterialForm {

  private Integer materialId;
  
  @NotEmpty
  private String materialName;
  
  private String materialDateCreated;
  
  @NotNull
  @Min(1000)
  @Max(1000000)
  private Integer materialSingleValue;
  
  @NotNull
  @Min(1)
  @Max(100)
  private Integer materialRemain;
  
  @NotEmpty
  private String materialSupplyName;
  
  @NotEmpty
  @Size(min = 10, max = 20)
  private String materialSupplyPhone;

  public Integer getMaterialId() {
    return materialId;
  }

  public void setMaterialId(Integer materialId) {
    this.materialId = materialId;
  }

  public String getMaterialName() {
    return materialName;
  }

  public void setMaterialName(String materialName) {
    this.materialName = materialName;
  }

  public Integer getMaterialSingleValue() {
    return materialSingleValue;
  }

  public void setMaterialSingleValue(Integer materialSingleValue) {
    this.materialSingleValue = materialSingleValue;
  }

  public Integer getMaterialRemain() {
    return materialRemain;
  }

  public void setMaterialRemain(Integer materialRemain) {
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

  public String getMaterialDateCreated() {
    return materialDateCreated;
  }

  public void setMaterialDateCreated(String materialDateCreated) {
    this.materialDateCreated = materialDateCreated;
  }

}
