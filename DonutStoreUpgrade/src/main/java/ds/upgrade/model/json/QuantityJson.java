package ds.upgrade.model.json;

import java.io.Serializable;

import ds.upgrade.model.Quantity;

public class QuantityJson implements Serializable {
  
  private static final long serialVersionUID = 4197942078910386097L;
  private ItemJson item;
  private int quantity;
  private Long price;

  public QuantityJson() {
  }

  public QuantityJson(Quantity quantity) {
    this.quantity = quantity.getQuantity();
    this.price = quantity.getQuantity() * quantity.getItemId().getSingleValue().longValue();
    this.item = new ItemJson(quantity.getItemId());
  }


  public ItemJson getItem() {
    return item;
  }

  public void setItem(ItemJson item) {
    this.item = item;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Long getPrice() {
    return price;
  }

  public void setPrice(Long price) {
    this.price = price;
  }

  @Override
  public String toString() {
    return "QuantityJson [item=" + item + ", quantity=" + quantity + ", price=" + price + "]";
  }
}
