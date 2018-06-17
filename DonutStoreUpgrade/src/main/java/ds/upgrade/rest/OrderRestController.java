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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Order;
import ds.upgrade.model.User;
import ds.upgrade.service.OrderService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstants;

/**
 * @description: /api/order.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(AppConstants.API_URL.MAIN_API + AppConstants.MODEL.ORDER_MODEL)
public class OrderRestController {

  @Autowired
  private OrderService orderService;
  @Autowired
  private UserService userService;

  /**
   * @description: /find-list.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(AppConstants.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable,
      @RequestParam(value = AppConstants.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = AppConstants.PARAM.STATUS_ID_PARAM, required = false) String statusId,
      @RequestParam(value = AppConstants.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstants.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = AppConstants.PARAM.IS_SHIPPING_PARAM, required = false) String isShipping) {
    try {
      User user = userService.findInfoUser();
      Long newStoreId;
      //Admin can overwatch all orders and Store have just overwatch all orders belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreId = user.getStoreId().getId();
      } else {
        newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
      }
      SimpleDateFormat format = new SimpleDateFormat(AppConstants.FORMAT.DATE_TIME_FORMAT_1);
      Long newStatusId = (StringUtils.isEmpty(statusId)) ? null : Long.parseLong(statusId);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      Boolean newIsShipping = (StringUtils.isEmpty(isShipping)) ? null
          : Boolean.parseBoolean(isShipping);
      Page<Order> list = orderService.findList(pageable, newStatusId, newStoreId, newIsShipping,
          newStartDate, newEndDate);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Order>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @GetMapping(AppConstants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(AppConstants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Order order = orderService.findOne(newId);
      if (order != null)
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
