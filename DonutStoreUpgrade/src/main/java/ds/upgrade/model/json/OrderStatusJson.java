package ds.upgrade.model.json;

import java.io.Serializable;

import ds.upgrade.model.OrderStatus;

public class OrderStatusJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private String name;
  private String description;

  public OrderStatusJson() {
  }

  public OrderStatusJson(OrderStatus os) {
    this.name = os.getName();
    this.description = os.getDescription();
  }

  @Override
  public String toString() {
    return "OrderStatusJson [name=" + name + ", description=" + description + "]";
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
