package ds.form;

import org.hibernate.validator.constraints.NotEmpty;

public class StaffForm {

  private String staffCode;
  @NotEmpty
  private String staffName;
  @NotEmpty
  private String storeCode;
  @NotEmpty
  private String staffPhoneNumber;
  @NotEmpty
  private String staffAddress;
  @NotEmpty
  private String staffIdentityCard;
  @NotEmpty
  private String staffHomeTown;
  @NotEmpty
  private String staffSalary;

  private String staffPicture;

  public String getStaffCode() {
    return staffCode;
  }

  public void setStaffCode(String staffCode) {
    this.staffCode = staffCode;
  }

  public String getStaffName() {
    return staffName;
  }

  public void setStaffName(String staffName) {
    this.staffName = staffName;
  }

  public String getStoreCode() {
    return storeCode;
  }

  public void setStoreCode(String storeCode) {
    this.storeCode = storeCode;
  }

  public String getStaffPhoneNumber() {
    return staffPhoneNumber;
  }

  public void setStaffPhoneNumber(String staffPhoneNumber) {
    this.staffPhoneNumber = staffPhoneNumber;
  }

  public String getStaffAddress() {
    return staffAddress;
  }

  public void setStaffAddress(String staffAddress) {
    this.staffAddress = staffAddress;
  }

  public String getStaffIdentityCard() {
    return staffIdentityCard;
  }

  public void setStaffIdentityCard(String staffIdentityCard) {
    this.staffIdentityCard = staffIdentityCard;
  }

  public String getStaffHomeTown() {
    return staffHomeTown;
  }

  public void setStaffHomeTown(String staffHomeTown) {
    this.staffHomeTown = staffHomeTown;
  }

  public String getStaffSalary() {
    return staffSalary;
  }

  public void setStaffSalary(String staffSalary) {
    this.staffSalary = staffSalary;
  }

  public String getStaffPicture() {
    return staffPicture;
  }

  public void setStaffPicture(String staffPicture) {
    this.staffPicture = staffPicture;
  }

}
