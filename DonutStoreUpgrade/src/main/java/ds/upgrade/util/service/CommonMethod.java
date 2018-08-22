package ds.upgrade.util.service;

import java.util.Date;

public interface CommonMethod {
  
  public String createOrderCode(Date date);
  public String createItemCode();
  public String createCategoryCode();
  public String createStoreCode();
  public String createQuantityCode(String orderCode, int index);

}
