package ds.upgrade.util.service.imp;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.support.OrderForm;
import ds.upgrade.model.support.QuantityForm;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.service.CustomValidation;

@Service
public class CustomValidationImp implements CustomValidation {

  @Autowired
  private ConfigGlobalService configGlobalService;

  @Override
  public Boolean isPhoneNumber(String phone) {
    if (phone == null) return false;
    final String newValue = phone.trim();

    return (newValue.length() >= AppConstant.VALIDATION.PHONE_MIN_LENGTH
        && newValue.length() <= AppConstant.VALIDATION.PHONE_MAX_LENGTH
        && AppConstant.VALIDATION.PHONE_FIRST_CHAR.equals(newValue.substring(0, 1))
        && StringUtils.isNumeric(newValue));
  }

  /**
   * Kiểm tra xem từng item có tổng tiền từng item bằng với tổng tiền đã tính
   * không Kiểm tra xem tổng tiền đơn hàng có bằng tổng tiền từng item cộng với
   * tiền giao hàng không. Kiểm tra phone có phù hợp không
   */
  @Override
  public Boolean verifyOrderJson(OrderForm orderJson) {
    if (orderJson.getQuantities().size() > 0) {
      Long totalPrice = 0L;
      for (QuantityForm quantityJson : orderJson.getQuantities()) {
        Long singleValue = quantityJson.getItem().getSingleValue();
        int quantity = quantityJson.getQuantity();
        Long price = quantityJson.getPrice();
        if (quantity * singleValue != price)
          return false;

        totalPrice = totalPrice + price;
      }
      if (totalPrice + orderJson.getShippingPrice() != orderJson.getTotalPrice()
          || totalPrice < Long.valueOf(
              configGlobalService.findByname(AppConstant.CONFIG_NAME.MIN_TOTAL_PRICE).getValue())
          || !isPhoneNumber(orderJson.getPhone()))
        return false;
    } else {
      return false;
    }
    return true;
  }

  @Override
  public Boolean notDeleteConfigGlobal(String name) {
    String newName = name.trim();
    return (AppConstant.CONFIG_NAME.LOGO.equals(newName)
        || AppConstant.CONFIG_NAME.HEADQUARTER.equals(newName)
        || AppConstant.CONFIG_NAME.HOT_LINE.equals(newName)
        || AppConstant.CONFIG_NAME.EMAIL.equals(newName)
        || AppConstant.CONFIG_NAME.MIN_TOTAL_PRICE.equals(newName)
        || AppConstant.CONFIG_NAME.FREE_SHIP_DISTANCE.equals(newName)
        || AppConstant.CONFIG_NAME.MIN_AHA_DISTANCE.equals(newName)
        || AppConstant.CONFIG_NAME.SUBSIDY_PRICE.equals(newName)
        || AppConstant.CONFIG_NAME.SINGLE_SHIPPING_PRICE.equals(newName)
        || AppConstant.CONFIG_NAME.MIN_SHIPPING_PRICE.equals(newName));
  }

}
