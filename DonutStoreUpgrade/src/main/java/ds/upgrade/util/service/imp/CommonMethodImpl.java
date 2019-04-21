package ds.upgrade.util.service.imp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.UIUtil;
import ds.upgrade.util.service.CommonMethod;

@Service
public class CommonMethodImpl implements CommonMethod {
  @Autowired
  private ConfigGlobalService configGlobalService;

  @Override
  public String createOrderCode(Date date) {
    String prefix = AppConstant.PREFIX_CODE.ORDER_PREFIX;
    String middle = new SimpleDateFormat("yyyyMMddHHmmss", Locale.ENGLISH).format(date);
//    String end = RandomStringUtils.random(3, AppConstant.FORMAT.RANDOM_STRING_BASIC);
    return prefix + middle;
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
  public String createDiscountCode(long index) {
    return AppConstant.PREFIX_CODE.DISCOUNT_PREFIX + index;
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

  @Override
  public List<Date> createRangeDateFilter(String key) {
    Date now = new Date();
    Date startDate;
    Date endDate = this.createEndDate(now);
    switch (key) {
    case "A_DAY":
      startDate = this.createStartDate(DateUtils.addDays(now, -1));
      break;
    case "A_WEEK":
      startDate = this.createStartDate(DateUtils.addDays(now, -7));
      break;
    case "A_MONTH":
      startDate = this.createStartDate(DateUtils.addMonths(now, -1));
      break;
    case "A_YEAR":
      startDate = this.createStartDate(DateUtils.addYears(now, -1));
      break;
    case "ALL_TIME":
      startDate = null;
      break;
    default:
      startDate = endDate;
      break;
    }
    List<Date> list = new ArrayList<>();
    list.add(startDate);
    list.add(endDate);
    return list;
  }

  @Override
  public void findHeaderInfo(String pageTitle, Model model) {
    model.addAttribute("title", pageTitle);
    model.addAttribute("logo", configGlobalService.findByname("logo").getValue());
    model.addAttribute("formatter", new UIUtil());
    model.addAttribute("hotLine", configGlobalService.findByname("hotLine").getValue());
    model.addAttribute("headquarter", configGlobalService.findByname("headquarter").getValue());
    model.addAttribute("email", configGlobalService.findByname("email").getValue());
  }
}
