package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "orders_id", nullable = false)
  private Long orderId;

  @Column(name = "order_date_created", nullable = false)
  private Date orderDateCreated;

  @Column(name = "order_date_done")
  private Date orderDateDone;

  @Column(name = "order_name_created", nullable = false)
  private String orderNameCreated;

  @Column(name = "order_phone_number", nullable = false)
  private String orderPhoneNumber;

  @ManyToOne
  @JoinColumn(name = "store_id", referencedColumnName = "store_id", nullable = false)
  private Store storeId;

  @ManyToOne
  @JoinColumn(name = "order_status_id", referencedColumnName = "id", nullable = false)
  private OrderStatus orderStatus;

  @OneToMany(cascade = CascadeType.ALL,mappedBy = "orderId")
  private Set<Quantity> quantities;

  @Column(name = "order_is_shipping", nullable = false)
  private boolean orderIsShipping;

  @Column(name = "order_address_shipping")
  private String orderAddressShipping;

  @Column(name = "order_shipping_price")
  private double orderShippingPrice;

  @Column(name = "order_total_price", nullable = false)
  private double orderTotalPrice;
  
  public Order() {}
  
  public Order(Long id) {
    this.orderId = id;
  }

  public String toString() {
    return this.orderNameCreated;
  }
  
  public Long getOrderId() {
    return orderId;
  }

  public void setOrderId(Long orderId) {
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

  public String getOrderNameCreated() {
    return orderNameCreated;
  }

  public void setOrderNameCreated(String orderNameCreated) {
    this.orderNameCreated = orderNameCreated;
  }

  public Store getStoreId() {
    return storeId;
  }

  public void setStoreId(Store storeId) {
    this.storeId = storeId;
  }

  public OrderStatus getOrderStatus() {
    return orderStatus;
  }

  public void setOrderStatus(OrderStatus orderStatus) {
    this.orderStatus = orderStatus;
  }

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

  public String getOrderPhoneNumber() {
    return orderPhoneNumber;
  }

  public void setOrderPhoneNumber(String orderPhoneNumber) {
    this.orderPhoneNumber = orderPhoneNumber;
  }

  public Set<Quantity> getQuantities() {
    return quantities;
  }

  public void setQuantities(Set<Quantity> quantities) {
    this.quantities = quantities;
  }

}
