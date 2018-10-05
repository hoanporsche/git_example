package ds.upgrade.model.json;

import java.io.Serializable;

public class ReportQuantityJson implements Serializable {
  private static final long serialVersionUID = 4197942078910386097L;

  private String itemName;
  private int totalQuantity;

  public ReportQuantityJson(String itemName, Integer totalQuantity) {
    super();
    this.itemName = itemName;
    this.totalQuantity = (totalQuantity == null) ? 0 : totalQuantity;
  }

  @Override
  public String toString() {
    return "ReportQuantityJson [itemName=" + itemName + ", totalQuantity=" + totalQuantity + "]";
  }

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public int getTotalQuantity() {
    return totalQuantity;
  }

  public void setTotalQuantity(Integer totalQuantity) {
    this.totalQuantity = (totalQuantity == null) ? 0 : totalQuantity;
  }
}
