package ds.upgrade.model.json;

import java.io.Serializable;

import ds.upgrade.model.Discount;

public class DiscountJson implements Serializable {
  private static final long serialVersionUID = 4197942078910386097L;

  private String code;
  private String name;
  public DiscountJson(Discount discount) {
    super();
    this.code = discount.getCode();
    this.name = discount.getName();
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
  @Override
  public String toString() {
    return "DiscountJson [code=" + code + ", name=" + name + "]";
  }
}
