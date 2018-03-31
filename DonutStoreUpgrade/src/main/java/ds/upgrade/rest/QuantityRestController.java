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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Quantity;
import ds.upgrade.service.QuantityService;
import ds.upgrade.util.Constants;

/**
 * @description: /api/quantity.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(Constants.API_URL.MAIN_API + Constants.MODEL.QUANTITY_MODEL)
public class QuantityRestController {

  @Autowired
  private QuantityService quantityService;

  /**
   * @description: /find-list.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @GetMapping(Constants.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable,
      @RequestParam(value = Constants.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = Constants.PARAM.ITEM_ID_PARAM, required = false) String itemId,
      @RequestParam(value = Constants.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = Constants.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = Constants.PARAM.IS_SHIPPING_PARAM, required = false) String isShipping) {
    try {
      SimpleDateFormat format = new SimpleDateFormat(Constants.FORMAT.DATE_FORMAT);
      Long newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
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
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {System.out.println(e.getMessage());
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @GetMapping(Constants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Quantity quantity = quantityService.findOne(newId);
      if (quantity != null)
        return new ResponseEntity<Quantity>(quantity, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
