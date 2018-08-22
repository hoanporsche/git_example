package ds.upgrade.model.support;

import java.io.Serializable;

public class QuantityJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private ReceivedItem item;
  private int quantity;
  private Long price;

  public ReceivedItem getItem() {
    return item;
  }

  public void setItem(ReceivedItem item) {
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