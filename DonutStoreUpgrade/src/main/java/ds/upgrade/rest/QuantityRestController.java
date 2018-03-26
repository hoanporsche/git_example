/**
 * 
 */
package ds.upgrade.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Quantity;
import ds.upgrade.service.QuantityService;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping("/api/quantity")
public class QuantityRestController {

  @Autowired
  private QuantityService quantityService;

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @GetMapping("/find-all")
  public ResponseEntity<?> findAll() {
    try {
      List<Quantity> list = quantityService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Quantity>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @GetMapping("/find-one")
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
