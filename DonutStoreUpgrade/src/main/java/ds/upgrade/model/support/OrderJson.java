package ds.upgrade.model.support;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class OrderJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @NotEmpty
  private String uvresp;
  @NotEmpty
  private String nameCreated;
  @NotEmpty
  private String phone;
  @NotEmpty
  private String storeCode;
  @NotEmpty
  private String addressShipping;
  @NotEmpty
  private String distance;
  @NotNull
  private Long shippingPrice;
  @NotNull
  private Long totalPrice;
  private List<QuantityJson> quantities;

  public String getUvresp() {
    return uvresp;
  }

  public void setUvresp(String uvresp) {
    this.uvresp = uvresp;
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

  public String getStoreCode() {
    return storeCode;
  }

  public void setStoreCode(String storeCode) {
    this.storeCode = storeCode;
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

  public void setQuantities(List<QuantityJson> quantities) {
    this.quantities = quantities;
  }

  @Override
  public String toString() {
    return "OrderJson [uvresp=" + uvresp + ", nameCreated=" + nameCreated + ", phone=" + phone
        + ", storeCode=" + storeCode + ", addressShipping=" + addressShipping + ", distance="
        + distance + ", shippingPrice=" + shippingPrice + ", totalPrice=" + totalPrice
        + ", quantities=" + quantities + "]";
  }
}
