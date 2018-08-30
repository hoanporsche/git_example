package ds.upgrade.model.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import ds.upgrade.model.Order;
import ds.upgrade.model.Quantity;

public class OrderJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private String code;
  private String nameCreated;
  private String phone;
  private String storeName;
  private Boolean shipping;
  private String addressShipping;
  private String distance;
  private Long shippingPrice;
  private Long totalPrice;
  private List<QuantityJson> quantities;
  private OrderStatusJson status;

  public OrderJson() {
  }

  public OrderJson(Order order, String storeName) {
    this.code = order.getCode();
    this.nameCreated = order.getNameCreated();
    this.phone = order.getPhone();
    this.storeName = storeName;
    this.shipping = order.isShipping();
    this.addressShipping = order.getAddressShipping();
    this.distance = order.getDistance();
    this.shippingPrice = order.getShippingPrice();
    this.totalPrice = order.getTotalPrice();
    this.setQuantities(order.getQuantities());
    this.status = new OrderStatusJson(order.getStatusId());
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getNameCreated() {
    return nameCreated;
  }

  public void setNameCreated(String nameCreated) {
    this.nameCreated = nameCreated;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getStoreName() {
    return storeName;
  }

  public void setStoreName(String storeName) {
    this.storeName = storeName;
  }

  public Boolean getShipping() {
    return shipping;
  }

  public void setShipping(Boolean shipping) {
    this.shipping = shipping;
  }

  public String getAddressShipping() {
    return addressShipping;
  }

  public void setAddressShipping(String addressShipping) {
    this.addressShipping = addressShipping;
  }

  public String getDistance() {
    return distance;
  }

  public void setDistance(String distance) {
    this.distance = distance;
  }

  public Long getShippingPrice() {
    return shippingPrice;
  }

  public void setShippingPrice(Long shippingPrice) {
    this.shippingPrice = shippingPrice;
  }

  public Long getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(Long totalPrice) {
    this.totalPrice = totalPrice;
  }

  public List<QuantityJson> getQuantities() {
    return quantities;
  }

  public void setQuantities(Set<Quantity> quantities) {
    this.quantities = new ArrayList<>();
    quantities.forEach(quantity -> {
      this.quantities.add(new QuantityJson(quantity));
    });
  }

  public OrderStatusJson getStatus() {
    return status;
  }

  public void setStatus(OrderStatusJson status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "OrderJson [nameCreated=" + nameCreated + ", phone=" + phone + ", storeName=" + storeName
        + ", shipping=" + shipping + ", addressShipping=" + addressShipping + ", distance="
        + distance + ", shippingPrice=" + shippingPrice + ", totalPrice=" + totalPrice
        + ", quantities=" + quantities + ", status=" + status + "]";
  }
}
