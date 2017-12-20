package ds.form;

import ds.model.Material;

import java.util.Set;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class ItemForm {
  private Integer itemId;
  
  private String itemCode;
  
  @NotEmpty
  private String itemName;
  
  private String itemDateCreated;

  @NotNull
  @Min(3000)
  @Max(30000)
  private Integer itemSingleValue;

  private Set<Material> materials;

  public Integer getItemId() {
    return itemId;
  }

  public void setItemId(Integer itemId) {
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

  public String getItemDateCreated() {
    return itemDateCreated;
  }

  public void setItemDateCreated(String itemDateCreated) {
    this.itemDateCreated = itemDateCreated;
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
