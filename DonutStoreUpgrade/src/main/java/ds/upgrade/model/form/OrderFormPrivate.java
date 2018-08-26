package ds.upgrade.model.form;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.NotEmpty;

public class OrderFormPrivate implements Serializable {
  private static final long serialVersionUID = 4197942078910386097L;

  private String code;
  @NotEmpty
  @Size(max = 40)
  private String nameCreated;
  @NotEmpty
  @Size(max = 11)
  private String phone;
  @NotNull
  private boolean shipping;
  @Size(max = 255)
  private String addressShipping;
  @Size(max = 20)
  private String distance;
  @Max(100000)
  private Long shippingPrice;
  @NotNull
  private Long totalPrice;
  private List<QuantityForm> quantities;

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

  public boolean isShipping() {
    return shipping;
  }

  public void setShipping(boolean shipping) {
    this.shipping = shipping;
  }

  public String getAddressShipping() {
    return addressShipping;
  }

  public void setAddressShipping(String addressShipping) {
    this.addressShipping = (StringUtils.isEmpty(addressShipping) || addressShipping == null) ? null
        : addressShipping;
  }

  public String getDistance() {
    return distance;
  }

  public void setDistance(String distance) {
    this.distance = (StringUtils.isEmpty(distance) || distance == null) ? null : distance;
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

  public List<QuantityForm> getQuantities() {
    return quantities;
  }

  public void setQuantities(List<QuantityForm> quantities) {
    this.quantities = quantities;
  }

  @Override
  public String toString() {
    return "OrderFormPrivate [nameCreated=" + nameCreated + ", phone=" + phone + ", shipping="
        + shipping + ", addressShipping=" + addressShipping + ", distance=" + distance
        + ", shippingPrice=" + shippingPrice + ", totalPrice=" + totalPrice + ", quantities="
        + quantities + "]";
  }
}
