package ds.upgrade.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "quantity")
public class Quantity implements Serializable {

  static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "quantity_id", nullable = false)
  private Long quantityId;
  @Column(name = "quantity_item_id", nullable = false)
  private Long quantityItemId;
  @Column(name = "quantity_item_quantity", nullable = false)
  private int quantityItemQuantity;

  @ManyToOne
  @JoinColumn(name = "orders_id", referencedColumnName = "orders_id", nullable = false)
  private Order orderId;
  
  public String toString() {
    return this.orderId.getOrderNameCreated();
  }

  public Long getQuantityId() {
    return quantityId;
  }

  public void setQuantityId(Long quantityId) {
    this.quantityId = quantityId;
  }

  public Long getQuantityItemId() {
    return quantityItemId;
  }

  public void setQuantityItemId(Long quantityItemId) {
    this.quantityItemId = quantityItemId;
  }

  public int getQuantityItemQuantity() {
    return quantityItemQuantity;
  }

  public void setQuantityItemQuantity(int quantityItemQuantity) {
    this.quantityItemQuantity = quantityItemQuantity;
  }

  public Order getOrderId() {
    return orderId;
  }

  public void setOrderId(Order order) {
    this.orderId = order;
  }

}
