package ds.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "store")
public class Store implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "store_id", nullable = false)
  private int storeId;
  @Size(max = 255)
  @Column(name = "store_name", nullable = false)
  private String storeName;
  @Size(max = 255)
  @Column(name = "store_picture")
  private String storePicture;
  @Size(max = 20)
  @Column(name = "store_phone_number", nullable = false)
  private String storePhoneNumber;
  @Size(max = 255)
  @Column(name = "store_address", nullable = false)
  private String storeAddress;
  @Column(name = "store_date_created")
  private Date storeDateCreated;
  @Column(name = "store_date_updated")
  private Date storeDateUpdated;
  @Column(name = "store_status", nullable = false)
  private boolean storeStatus;

  @OneToMany(mappedBy = "staffStore")
  @JsonIgnore
  private List<Staff> staffs;
  

  @ManyToMany
  @JoinTable(name = "item_store", joinColumns = @JoinColumn(name = "store_id"),
      inverseJoinColumns = @JoinColumn(name = "item_id"))
  @JsonIgnore
  private Set<Item> items;
  
  public Store() {}
  
  public Store(Date storeDateUpdated) {
    this.storeDateUpdated = storeDateUpdated;
  }
  
  /** Constructor .
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 22, 2017
   * @param storeName .
   * @param storeDateCreated .
   * @param storeDateUpdated .
   * @param status .
   */
  public Store(String storeName,Date storeDateCreated, Date storeDateUpdated, boolean status) {
    this.storeName = storeName;
    this.storeDateCreated = storeDateCreated;
    this.storeDateUpdated = storeDateUpdated;
    this.storeStatus = status;
  }
  
  public String toString() {
    return this.storeName;
  }
  
  public int getStoreId() {
    return storeId;
  }

  public void setStoreId(int storeId) {
    this.storeId = storeId;
  }
  
  public String getStoreName() {
    return storeName;
  }

  public void setStoreName(String storeName) {
    this.storeName = storeName;
  }

  public String getStorePhoneNumber() {
    return storePhoneNumber;
  }

  public void setStorePhoneNumber(String storePhoneNumber) {
    this.storePhoneNumber = storePhoneNumber;
  }

  public String getStoreAddress() {
    return storeAddress;
  }

  public void setStoreAddress(String storeAddress) {
    this.storeAddress = storeAddress;
  }

  public Date getStoreDateCreated() {
    return storeDateCreated;
  }

  public void setStoreDateCreated(Date storeDateCreated) {
    this.storeDateCreated = storeDateCreated;
  }

  public Date getStoreDateUpdated() {
    return storeDateUpdated;
  }

  public void setStoreDateUpdated(Date storeDateUpdated) {
    this.storeDateUpdated = storeDateUpdated;
  }

  public boolean isStoreStatus() {
    return storeStatus;
  }

  public void setStoreStatus(boolean storeStatus) {
    this.storeStatus = storeStatus;
  }

  public List<Staff> getStaffs() {
    return staffs;
  }

  public void setStaffs(List<Staff> staffs) {
    this.staffs = staffs;
  }

  public String getStorePicture() {
    return storePicture;
  }

  public void setStorePicture(String storePicture) {
    this.storePicture = storePicture;
  }

  public Set<Item> getItems() {
    return items;
  }

  public void setItems(Set<Item> items) {
    this.items = items;
  }
  
}
