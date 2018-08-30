package ds.upgrade.util.service;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.model.form.OrderFormPrivate;
import ds.upgrade.model.form.OrderFormPublic;

public interface CustomValidation {

  public Boolean isPhoneNumber(String phone);
  
  public Boolean verifyOrderFormPublic(OrderFormPublic orderForm);

  public Boolean notDeleteConfigGlobal(String name);
  
  public Boolean canUpdateOrderStatus(OrderStatus oldStatusId, Long newStatusId);

  public Boolean verifyOrderFormPrivate(OrderFormPrivate orderForm);
}
