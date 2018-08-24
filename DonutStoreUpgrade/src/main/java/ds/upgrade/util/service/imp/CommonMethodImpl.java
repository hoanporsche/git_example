package ds.upgrade.util.service.imp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import ds.upgrade.util.AppConstant;
import ds.upgrade.util.service.CommonMethod;

@Service
public class CommonMethodImpl implements CommonMethod {

  @Override
  public String createOrderCode(Date date) {
    String prefix = AppConstant.PREFIX_CODE.ORDER_PREFIX;
    String middle = new SimpleDateFormat("yyyyMMddHHmmss", Locale.ENGLISH).format(date);
    String end = RandomStringUtils.random(3, AppConstant.FORMAT.RANDOM_STRING_BASIC);
    return prefix + middle + end;
  }

  @Override
  public String createItemCode() {
    return AppConstant.PREFIX_CODE.ITEM_PREFIX
        + RandomStringUtils.random(7, AppConstant.FORMAT.RANDOM_STRING_BASIC);
  }

  @Override
  public String createCategoryCode() {
    return AppConstant.PREFIX_CODE.CATEGORY_PREFIX
        + RandomStringUtils.random(7, AppConstant.FORMAT.RANDOM_STRING_BASIC);
  }

  @Override
  public String createStoreCode() {
    return AppConstant.PREFIX_CODE.STORE_PREFIX
        + RandomStringUtils.random(7, AppConstant.FORMAT.RANDOM_STRING_BASIC);
  }

  @Override
  public String createQuantityCode(String orderCode, int index) {
    String quantityIndex = (index < 10) ? ("0" + String.valueOf(index)) : String.valueOf(index);
    return orderCode + quantityIndex;
  }

  @Override
  public Date createStartDate(Date now) {
    String format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH).format(now);
    try {
      return new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1)
          .parse(format + " 00:00:00");
    } catch (ParseException e) {
      return null;
    }
  }

  @Override
  public Date createEndDate(Date now) {
    String format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH).format(now);
    try {
      return new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1)
          .parse(format + " 23:59:59");
    } catch (ParseException e) {
      return null;
    }
  }

}
