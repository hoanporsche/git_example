package ds.upgrade.model.support;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class Sender {

  @NotEmpty
  @NotNull
  private String name;
  @NotEmpty
  @NotNull
  private String phone;
  
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }
  @Override
  public String toString() {
    return "Sender [name=" + name + ", phone=" + phone + "]";
  }
  
}
