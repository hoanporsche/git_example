package ds.upgrade.util.service;

import java.util.Date;
import java.util.List;

public interface CommonMethod {
  
  public String createOrderCode(Date date);
  public String createItemCode();
  public String createCategoryCode();
  public String createStoreCode();
  public String createQuantityCode(String orderCode, int index);
  public String createDiscountCode(long index);
  public Date createStartDate(Date now);
  public Date createEndDate(Date now);
  public List<Date> createRangeDateFilter(String key);
}
