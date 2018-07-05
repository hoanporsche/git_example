package ds.upgrade.model.support;

import java.io.Serializable;
import java.math.BigDecimal;

import ds.upgrade.model.Item;

public class ItemJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  private String name;
  private String picture;
  private BigDecimal singleValue;
  private String description;
  
  public ItemJson(Item item) {
    this.setName(item.getName());
    this.setPicture(item.getPicture());
    this.setSingleValue(item.getSingleValue());
    this.setDescription(item.getDescription());
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

  public BigDecimal getSingleValue() {
    return singleValue;
  }

  public void setSingleValue(BigDecimal singleValue) {
    this.singleValue = singleValue;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
