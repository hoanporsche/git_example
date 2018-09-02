package ds.upgrade.model.json;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import ds.upgrade.model.SenderDb;

public class Sender {

  @NotEmpty
  @NotNull
  @Size(max = 20)
  private String name;
  @NotEmpty
  @NotNull
  @Size(max = 20)
  private String phone;

  public Sender() {
  }

  public Sender(String name, String phone) {
    this.name = name;
    this.phone = phone;
  }

  public Sender(SenderDb senderDb) {
    this.name = senderDb.getName();
    this.phone = senderDb.getPhone();
  }

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
