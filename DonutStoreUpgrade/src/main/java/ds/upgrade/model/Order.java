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
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "date_created", nullable = false)
  private Date dateCreated;

  @Column(name = "date_done")
  private Date dateDone;

  @Column(name = "name_created", nullable = false)
  private String nameCreated;

  @Column(name = "phone", nullable = false)
  private String phone;

  @ManyToOne
  @JoinColumn(name = "store_id", referencedColumnName = "id", nullable = false)
  private Store storeId;

  @ManyToOne
  @JoinColumn(name = "status_id", referencedColumnName = "id", nullable = false)
  private OrderStatus statusId;

  @OneToMany(cascade = CascadeType.ALL,mappedBy = "orderId")
  private Set<Quantity> quantities;

  @Column(name = "is_shipping", nullable = false)
  private boolean isShipping;

  @Column(name = "address_shipping")
  private String addressShipping;

  @Column(name = "shipping_price")
  private double shippingPrice;

  @Column(name = "total_price", nullable = false)
  private double totalPrice;
  
  public Order() {}

  public String toString() {
    return this.nameCreated;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateDone() {
    return dateDone;
  }

  public void setDateDone(Date dateDone) {
    this.dateDone = dateDone;
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

  public Store getStoreId() {
    return storeId;
  }

  public void setStoreId(Store storeId) {
    this.storeId = storeId;
  }

  public OrderStatus getStatusId() {
    return statusId;
  }

  public void setStatusId(OrderStatus statusId) {
    this.statusId = statusId;
  }

  public Set<Quantity> getQuantities() {
    return quantities;
  }

  public void setQuantities(Set<Quantity> quantities) {
    this.quantities = quantities;
  }

  public boolean isShipping() {
    return isShipping;
  }

  public void setShipping(boolean isShipping) {
    this.isShipping = isShipping;
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
