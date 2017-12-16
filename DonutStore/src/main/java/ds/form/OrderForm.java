package ds.form;

import org.hibernate.validator.constraints.NotEmpty;

public class OrderForm {

  private int id;
  @NotEmpty
  private String nameCreate;
  @NotEmpty
  private String phoneReceiver;
  @NotEmpty
  private String dateDone;

  private boolean shipping;
  private String addressShipping;
  private double shippingPrice;
  private double totalPrice;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getNameCreate() {
    return nameCreate;
  }

  public void setNameCreate(String nameCreate) {
    this.nameCreate = nameCreate;
  }

  public String getPhoneReceiver() {
    return phoneReceiver;
  }

  public void setPhoneReceiver(String phoneReceiver) {
    this.phoneReceiver = phoneReceiver;
  }

  public String getDateDone() {
    return dateDone;
  }

  public void setDateDone(String dateDone) {
    this.dateDone = dateDone;
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
    this.addressShipping = addressShipping;
  }

  public double getShippingPrice() {
    return shippingPrice;
  }

  public void setShippingPrice(double shippingPrice) {
    this.shippingPrice = shippingPrice;
  }

  public double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

}
