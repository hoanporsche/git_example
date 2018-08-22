package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @Column(name = "code", nullable = false, unique = true)
  private String code;

  @Column(name = "date_created", nullable = false)
  private Date dateCreated;

  @Column(name = "date_updated")
  private Date dateUpdated;

  @Size(max = 40)
  @Column(name = "name_created", nullable = false)
  private String nameCreated;

  @Size(max = 11)
  @Column(name = "phone", nullable = false)
  private String phone;

  @ManyToOne
  @JoinColumn(name = "store_id", referencedColumnName = "id", nullable = false)
  private Store storeId;

  @ManyToOne
  @JoinColumn(name = "status_id", referencedColumnName = "id", nullable = false)
  private OrderStatus statusId;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderCode")
  private Set<Quantity> quantities;

  @Column(name = "shipping", nullable = false)
  private boolean shipping;

  @Size(max = 255)
  @Column(name = "address_shipping")
  private String addressShipping;

  @Size(max = 20)
  @Column(name = "distance")
  private String distance;

  @Column(name = "shipping_price")
  private Long shippingPrice;

  @Column(name = "total_price", nullable = false)
  private Long totalPrice;

  public Order() {
  }
  
  public Order(String code) {
    this.code = code;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateUpdated() {
    return dateUpdated;
  }

  public void setDateUpdated(Date dateUpdated) {
    this.dateUpdated = dateUpdated;
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

  @Override
  public String toString() {
    return "Order [code=" + code + ", dateCreated=" + dateCreated + ", dateUpdated="
        + dateUpdated + ", nameCreated=" + nameCreated + ", phone=" + phone + ", storeId=" + storeId
        + ", statusId=" + statusId + ", quantities=" + quantities + ", shipping=" + shipping
        + ", addressShipping=" + addressShipping + ", distance=" + distance + ", shippingPrice="
        + shippingPrice + ", totalPrice=" + totalPrice + "]";
  }

}
