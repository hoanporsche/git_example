package ds.upgrade.util.service;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.model.support.OrderForm;

public interface CustomValidation {

  public Boolean isPhoneNumber(String phone);
  
  public Boolean verifyOrderJson(OrderForm orderJson);

  public Boolean notDeleteConfigGlobal(String name);
  
  public Boolean canUpdateOrderStatus(OrderStatus oldStatusId, Long newStatusId);
}
