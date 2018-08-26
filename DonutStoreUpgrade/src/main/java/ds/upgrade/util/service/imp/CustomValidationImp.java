package ds.upgrade.util.service.imp;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.model.form.OrderFormPrivate;
import ds.upgrade.model.form.OrderFormPublic;
import ds.upgrade.model.form.QuantityForm;
import ds.upgrade.repository.OrderStatusRepository;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.service.CustomValidation;

@Service
public class CustomValidationImp implements CustomValidation {

  @Autowired
  private ConfigGlobalService configGlobalService;
  @Autowired
  private OrderStatusRepository orderStatusRepository;

  @Override
  public Boolean isPhoneNumber(String phone) {
    if (phone == null)
      return false;
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
  public Boolean verifyOrderFormPublic(OrderFormPublic orderForm) {
    if (orderForm.getQuantities().size() > 0) {
      Long totalPrice = 0L;
      for (QuantityForm quantityJson : orderForm.getQuantities()) {
        Long singleValue = quantityJson.getItem().getSingleValue();
        int quantity = quantityJson.getQuantity();
        Long price = quantityJson.getPrice();
        if (quantity * singleValue != price)
          return Boolean.FALSE;

        totalPrice = totalPrice + price;
      }
      if (totalPrice + orderForm.getShippingPrice() != orderForm.getTotalPrice()
          || totalPrice < Long.valueOf(
              configGlobalService.findByname(AppConstant.CONFIG_NAME.MIN_TOTAL_PRICE).getValue())
          || !isPhoneNumber(orderForm.getPhone()))
        return Boolean.FALSE;
    } else {
      return Boolean.FALSE;
    }
    return Boolean.TRUE;
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

  @Override
  public Boolean canUpdateOrderStatus(OrderStatus oldStatusId, Long newStatusId) {
    if (oldStatusId.getId() == 4 || oldStatusId.getId() == 5)
      return Boolean.FALSE;
    List<OrderStatus> findAll = orderStatusRepository.findAll();
    List<OrderStatus> availableList = findAll.subList(findAll.indexOf(oldStatusId) + 1,
        findAll.size());
    for (OrderStatus os : availableList) {
      if (os.getId() == newStatusId)
        return Boolean.TRUE;
    }
    return Boolean.FALSE;
  }

  @Override
  public Boolean verifyOrderFormPrivate(OrderFormPrivate orderForm) {
    if (orderForm.getQuantities().size() > 0) {
      Long totalPrice = 0L;
      for (QuantityForm quantityJson : orderForm.getQuantities()) {
        Long singleValue = quantityJson.getItem().getSingleValue();
        int quantity = quantityJson.getQuantity();
        Long price = quantityJson.getPrice();
        if (quantity * singleValue != price)
          return Boolean.FALSE;
        totalPrice = totalPrice + price;
      }
      //Kiểm tra nếu có shipping là true thì bắt buộc phải có address, distance, shipping price
      if (orderForm.isShipping() && (orderForm.getAddressShipping() == null
          || orderForm.getDistance() == null || orderForm.getShippingPrice() == null))
        return Boolean.FALSE;
      //Còn nếu shipping là false thì k đc có address, distance, shipping price
      if (!orderForm.isShipping() && (orderForm.getAddressShipping() != null
          || orderForm.getDistance() != null || orderForm.getShippingPrice() != null))
        return Boolean.FALSE;
      Long shippingPrice = orderForm.getShippingPrice() == null ? 0 : orderForm.getShippingPrice(); 
      System.out.println(totalPrice + shippingPrice);
      System.out.println(orderForm.getTotalPrice());
      System.out.println(configGlobalService.findByname(AppConstant.CONFIG_NAME.MIN_TOTAL_PRICE).getValue());
      if (totalPrice + shippingPrice != orderForm.getTotalPrice()
          || totalPrice < Long.valueOf(
              configGlobalService.findByname(AppConstant.CONFIG_NAME.MIN_TOTAL_PRICE).getValue())
          || !isPhoneNumber(orderForm.getPhone()))
        return Boolean.FALSE;
    } else {
      return Boolean.FALSE;
    }
    return Boolean.TRUE;
  }

}
