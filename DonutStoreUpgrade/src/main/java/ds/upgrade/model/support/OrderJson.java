package ds.upgrade.model.support;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotEmpty;

public class OrderJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @NotEmpty
  private String capchaKey;
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
  @NotEmpty
  private String shippingPrice;
  @NotEmpty
  private String totalPrice;

  public String getCapchaKey() {
    return capchaKey;
  }

  public void setCapchaKey(String capchaKey) {
    this.capchaKey = capchaKey;
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

  public String getShippingPrice() {
    return shippingPrice;
  }

  public void setShippingPrice(String shippingPrice) {
    this.shippingPrice = shippingPrice;
  }

  public String getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(String totalPrice) {
    this.totalPrice = totalPrice;
  }

  @Override
  public String toString() {
    return "OrderJson [nameCreated=" + nameCreated + ", phone=" + phone + ", storeCode=" + storeCode
        + ", addressShipping=" + addressShipping + ", distance=" + distance + ", shippingPrice="
        + shippingPrice + ", totalPrice=" + totalPrice + "]";
  }

}
