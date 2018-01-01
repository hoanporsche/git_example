package ds.model;

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

  static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "quantity_id", nullable = false)
  private int quantityId;
  @Column(name = "quantity_item_id", nullable = false)
  private int quantityItemId;
  @Column(name = "quantity_item_quantity", nullable = false)
  private int quantityItemQuantity;

  @ManyToOne
  @JoinColumn(name = "orders_id", referencedColumnName = "orders_id", nullable = false)
  private Order order;
  
  public String toString() {
    return this.order.getOrderNameCreated();
  }

  public int getQuantityId() {
    return quantityId;
  }

  public void setQuantityId(int quantityId) {
    this.quantityId = quantityId;
  }

  public int getQuantityItemId() {
    return quantityItemId;
  }

  public void setQuantityItemId(int quantityItemId) {
    this.quantityItemId = quantityItemId;
  }

  public int getQuantityItemQuantity() {
    return quantityItemQuantity;
  }

  public void setQuantityItemQuantity(int quantityItemQuantity) {
    this.quantityItemQuantity = quantityItemQuantity;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

}
