package ds.upgrade.util.service;

import ds.upgrade.model.support.OrderJson;

public interface CustomValidation {

  public Boolean isPhoneNumber(String phone);
  
  public Boolean verifyOrderJson(OrderJson orderJson);
}
