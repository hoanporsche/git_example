package ds.upgrade.model.support;

import java.util.Arrays;

public class ItemForm {
  private String code;
  private String name;
  private String[] picture;
  private Long singleValue;
  private String description;

  @Override
  public String toString() {
    return "ReceivedItem [code=" + code + ", name=" + name + ", picture=" + Arrays.toString(picture)
        + ", singleValue=" + singleValue + ", description=" + description + "]";
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

  public String[] getPicture() {
    return picture;
  }

  public void setPicture(String[] picture) {
    this.picture = picture;
  }

  public Long getSingleValue() {
    return singleValue;
  }

  public void setSingleValue(Long singleValue) {
    this.singleValue = singleValue;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
