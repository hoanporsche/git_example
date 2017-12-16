package ds.form;

import ds.model.Material;

import java.util.Set;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class ItemForm {
  
  private String itemCode;
  
  @NotEmpty
  private String itemName;

  @NotNull
  @Min(3000)
  @Max(30000)
  private Integer itemSingleValue;

  private Set<Material> materials;

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

  public Integer getItemSingleValue() {
    return itemSingleValue;
  }

  public void setItemSingleValue(Integer itemSingleValue) {
    this.itemSingleValue = itemSingleValue;
  }

  public Set<Material> getMaterials() {
    return materials;
  }

  public void setMaterials(Set<Material> materials) {
    this.materials = materials;
  }

}
