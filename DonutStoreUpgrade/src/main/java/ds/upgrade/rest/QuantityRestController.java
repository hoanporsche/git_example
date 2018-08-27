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

import ds.upgrade.model.Quantity;
import ds.upgrade.model.User;
import ds.upgrade.service.QuantityService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;

/**
 * @description: /api/quantity.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.QUANTITY_MODEL)
public class QuantityRestController {

  @Autowired
  private QuantityService quantityService;
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
  @GetMapping(AppConstant.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable,
      @RequestParam(value = AppConstant.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = AppConstant.PARAM.ITEM_ID_PARAM, required = false) String itemId,
      @RequestParam(value = AppConstant.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstant.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = AppConstant.PARAM.SHIPPING_PARAM, required = false) String isShipping) {
    try {
      User user = userService.findInfoUser();
      Long newStoreId;
      //Admin can overwatch all quantites and Store have just overwatch all quantities belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreId = user.getStoreId().getId();
      } else {
        newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
      }
      SimpleDateFormat format = new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1);
      Long newItemId = (StringUtils.isEmpty(itemId)) ? null : Long.parseLong(itemId);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      Boolean newIsShipping = (StringUtils.isEmpty(isShipping)) ? null
          : Boolean.parseBoolean(isShipping);

      Page<Quantity> list = quantityService.findList(pageable, newStoreId, newItemId, newStartDate,
          newEndDate, newIsShipping);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Quantity>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {System.out.println(e.getMessage());
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
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
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping(AppConstant.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(AppConstant.PARAM.CODE_PARAM) String code) {
    try {
      Quantity quantity = quantityService.findOne(code);
      if (quantity != null)
        return new ResponseEntity<Quantity>(quantity, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
