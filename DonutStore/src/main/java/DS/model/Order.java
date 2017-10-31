package DS.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order")
public class Order implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "order_id", nullable = false)
  private int orderId;

  @Column(name = "order_date_created", nullable = false)
  private Date orderDateCreated;

  @Column(name = "order_date_done")
  private Date orderDateDone;

  @Column(name = "order_name_created", nullable = false)
  private User orderNameCreated;
  
  @Column(name = "order_phone_number", nullable = false)
  private User orderPhoneNumber;
  
  @Column(name = "order_mod_name", nullable = false)
  private User orderModName;

  @Column(name = "order_status", nullable = false)
  private int orderStatus;

  // private Set<Quantity> orderListQuantities;

  @Column(name = "order_is_shipping", nullable = false)
  private boolean orderIsShipping;

  @Column(name = "order_address_shipping")
  private String orderAddressShipping;

  @Column(name = "order_shipping_price")
  private double orderShippingPrice;
  
  @Column(name = "order_total_price", nullable = false)
  private double orderTotalPrice;

  public long getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public Date getOrderDateCreated() {
    return orderDateCreated;
  }

  public void setOrderDateCreated(Date orderDateCreated) {
    this.orderDateCreated = orderDateCreated;
  }

  public Date getOrderDateDone() {
    return orderDateDone;
  }

  public void setOrderDateDone(Date orderDateDone) {
    this.orderDateDone = orderDateDone;
  }

  public User getOrderNameCreated() {
    return orderNameCreated;
  }

  public void setOrderNameCreated(User orderNameCreated) {
    this.orderNameCreated = orderNameCreated;
  }

  public User getOrderModName() {
    return orderModName;
  }

  public void setOrderModName(User orderModName) {
    this.orderModName = orderModName;
  }

  public int getOrderStatus() {
    return orderStatus;
  }

  public void setOrderStatus(int orderStatus) {
    this.orderStatus = orderStatus;
  }

  // public Set<Quantity> getOrderListQuantities() {
  // return orderListQuantities;
  // }
  // public void setOrderListQuantities(Set<Quantity> orderListQuantities) {
  // this.orderListQuantities = orderListQuantities;
  // }
  public boolean getOrderIsShipping() {
    return orderIsShipping;
  }
  
  public void setOrderIsShipping(boolean orderIsShipping) {
    this.orderIsShipping = orderIsShipping;
  }
  
  public String getOrderAddressShipping() {
    return orderAddressShipping;
  }
  
  public void setOrderAddressShipping(String orderAddressShipping) {
    this.orderAddressShipping = orderAddressShipping;
  }
  
  public double getOrderShippingPrice() {
    return orderShippingPrice;
  }
  
  public void setOrderShippingPrice(double orderShippingPrice) {
    this.orderShippingPrice = orderShippingPrice;
  }
  
  public double getOrderTotalPrice() {
    return orderTotalPrice;
  }
  
  public void setOrderTotalPrice(double orderTotalPrice) {
    this.orderTotalPrice = orderTotalPrice;
  }

  public User getOrderPhoneNumber() {
    return orderPhoneNumber;
  }

  public void setOrderPhoneNumber(User orderPhoneNumber) {
    this.orderPhoneNumber = orderPhoneNumber;
  }
  
}
