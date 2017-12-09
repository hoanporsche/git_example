package ds.form;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class ItemForm {
  @NotEmpty
  private String itemName;
  @NotNull
  @Min(3000)
  @Max(30000)
  private Integer itemSingleValue;
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
  
  
}
