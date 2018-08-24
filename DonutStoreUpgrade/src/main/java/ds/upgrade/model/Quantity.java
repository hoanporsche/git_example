package ds.upgrade.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "quantity")
public class Quantity implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @Column(name = "code", nullable = false)
  private String code;
  @ManyToOne
  @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false)
  private Item itemId;
  @Column(name = "quantity", nullable = false)
  private int quantity;

  @ManyToOne
  @JsonProperty(access = Access.WRITE_ONLY)
  @JoinColumn(name = "order_code", referencedColumnName = "code", nullable = false)
  private Order orderCode;

  @Override
  public String toString() {
    return "Quantity [code=" + code + ", itemId=" + itemId + ", quantity=" + quantity
        + ", orderCode=" + orderCode + "]";
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public Item getItemId() {
    return itemId;
  }

  public void setItemId(Item itemId) {
    this.itemId = itemId;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Order getOrderCode() {
    return orderCode;
  }

  public void setOrderCode(Order orderCode) {
    this.orderCode = orderCode;
  }

}
