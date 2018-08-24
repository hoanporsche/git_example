package ds.upgrade.model.support;

import ds.upgrade.model.Store;

public class StoreJson {
  private String code;
  private String name;
  private String picture;
  private String phone;
  private String address;
  private String lat;
  private String lng;

  public StoreJson(Store store) {
    this.code = store.getCode();
    this.name = store.getName();
    this.picture = store.getPicture();
    this.phone = store.getPhone();
    this.address = store.getAddress();
    this.lat = store.getLat();
    this.lng = store.getLng();
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getLat() {
    return lat;
  }

  public void setLat(String lat) {
    this.lat = lat;
  }

  public String getLng() {
    return lng;
  }

  public void setLng(String lng) {
    this.lng = lng;
  }
}
