package ds.form;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class MaterialForm {
  
  private Integer materialId;

  private String materialCode;
  
  @NotEmpty
  private String materialName;
  
  private String materialDateCreated;
  
  @NotNull
  @Min(1000)
  @Max(1000000)
  private Integer materialSingleValue;
  
  @NotEmpty
  private String supplyCode;

  public Integer getMaterialId() {
    return materialId;
  }

  public void setMaterialId(Integer materialId) {
    this.materialId = materialId;
  }

  public String getMaterialCode() {
    return materialCode;
  }

  public void setMaterialCode(String materialCode) {
    this.materialCode = materialCode;
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

  public String getMaterialDateCreated() {
    return materialDateCreated;
  }

  public void setMaterialDateCreated(String materialDateCreated) {
    this.materialDateCreated = materialDateCreated;
  }

  public String getSupplyCode() {
    return supplyCode;
  }

  public void setSupplyCode(String supplyCode) {
    this.supplyCode = supplyCode;
  }

}
