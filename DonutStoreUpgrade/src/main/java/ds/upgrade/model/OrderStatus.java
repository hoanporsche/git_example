/**
 * 
 */
package ds.upgrade.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
@Entity
@Table(name = "order_status")
public class OrderStatus implements Serializable {

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   * @modifier: User
   * @modifier_date: Mar 6, 2018
   */
  private static final long serialVersionUID = 4197942078910386097L;
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;
  @Size(max = 255)
  @Column(name = "tilte")
  private String title;
  @Size(max = 1000)
  @Column(name = "desciption")
  private String description;
  
  @OneToMany(cascade = CascadeType.ALL,mappedBy = "orderStatus")
  private List<Order> orders;
  
  public OrderStatus() {}
  
  public OrderStatus(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }
  
}
