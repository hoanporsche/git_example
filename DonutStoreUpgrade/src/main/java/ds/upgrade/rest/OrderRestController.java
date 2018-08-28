/**
 * 
 */
package ds.upgrade.rest;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Order;
import ds.upgrade.model.Store;
import ds.upgrade.model.User;
import ds.upgrade.model.form.OrderFormPrivate;
import ds.upgrade.service.OrderService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.service.CustomValidation;

/**
 * @description: /api/order.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.ORDER_MODEL)
public class OrderRestController {

  @Autowired
  private OrderService orderService;
  @Autowired
  private UserService userService;
  @Autowired
  private CustomValidation customValidation;

  /**
   * @description: /find-list.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(AppConstant.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable,
      @RequestParam(value = AppConstant.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstant.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = AppConstant.PARAM.STORE_CODE_PARAM, required = false) String storeCode,
      @RequestParam(value = AppConstant.PARAM.STATUS_ID_PARAM, required = false) String statusId,
      @RequestParam(value = AppConstant.PARAM.SHIPPING_PARAM, required = false) String shipping,
      @RequestParam(value = AppConstant.PARAM.SEARCH_STRING_PARAM, required = false) String searchString) {
    try {
      User user = userService.findInfoUser();
      String newStoreCode;
      // Admin can overwatch all orders and Store have just overwatch all orders
      // belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreCode = user.getStoreId().getCode();
      } else {
        newStoreCode = StringUtils.isEmpty(storeCode) ? null : storeCode;
      }
      SimpleDateFormat format = new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1);

      Long newStatusId = StringUtils.isEmpty(statusId) ? null : Long.parseLong(statusId);

      Date newStartDate = StringUtils.isEmpty(startDate) ? null
          : format.parse(startDate + " 00:00:00");

      Date newEndDate = StringUtils.isEmpty(endDate) ? null : format.parse(endDate + " 23:59:59");

      Boolean newIsShipping = StringUtils.isEmpty(shipping) ? null : Boolean.parseBoolean(shipping);

      String newSearchString = StringUtils.isEmpty(searchString) ? null : searchString;

      Page<Order> list = orderService.findList(pageable, newStatusId, newStoreCode, newIsShipping,
          newStartDate, newEndDate, newSearchString);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Order>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR + " " + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /find-one.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(AppConstant.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(AppConstant.PARAM.CODE_PARAM) String code) {
    try {
      Order order = orderService.findOne(code);
      if (order != null)
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  @GetMapping("/change-status")
  public ResponseEntity<?> changeStatus(@RequestParam(AppConstant.PARAM.CODE_PARAM) String code,
      @RequestParam(AppConstant.PARAM.STATUS_ID_PARAM) String statusId) {
    try {
      Long newStatusId = Long.parseLong(statusId);
      Boolean order = orderService.changeStatus(code, newStatusId);
      if (order)
        return new ResponseEntity<Boolean>(order, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NOT_SAVE, HttpStatus.FORBIDDEN);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(AppConstant.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated OrderFormPrivate orderForm,
      BindingResult result) {
    try {
      System.out.println(orderForm);
      if (result.hasErrors() || !customValidation.verifyOrderFormPrivate(orderForm))
        return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT,
            HttpStatus.NOT_ACCEPTABLE);
      Store userStore = userService.findInfoUser().getStoreId();
      Boolean isSaved = orderService.createOrUpdate(orderForm, userStore);
      if (isSaved)
        return new ResponseEntity<Boolean>(isSaved, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NOT_SAVE, HttpStatus.FORBIDDEN);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + e,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
