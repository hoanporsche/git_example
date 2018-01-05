package ds.form;

import ds.model.Item;

import java.util.Set;

import org.hibernate.validator.constraints.NotEmpty;

public class StoreForm {

  private String storeCode;
  @NotEmpty
  private String storeName;
  @NotEmpty
  private String storePhoneNumber;
  @NotEmpty
  private String storeAddress;
  
  private Set<Item> items;

  public String getStoreCode() {
    return storeCode;
  }

  public void setStoreCode(String storeCode) {
    this.storeCode = storeCode;
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

  public Set<Item> getItems() {
    return items;
  }

  public void setItems(Set<Item> items) {
    this.items = items;
  }

}
