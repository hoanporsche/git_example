/**
 * 
 */
package ds.upgrade.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Supply;
import ds.upgrade.service.SupplyService;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.service.CustomValidation;

/**
 * @description: /api/supply.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.SUPPLY_MODEL)
public class SupplyRestController {

  @Autowired
  private SupplyService supplyService;
  @Autowired
  private CustomValidation customValidation;

  /**
   * @description: /find-all.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @GetMapping(AppConstant.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll() {
    try {
      List<Supply> list = supplyService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Supply>>(list, HttpStatus.OK);
    } catch (Exception e) {
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
  @GetMapping(AppConstant.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(AppConstant.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Supply supply = supplyService.findOne(newId);
      if (supply != null)
        return new ResponseEntity<Supply>(supply, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /find-list.
   * @author: VDHoan
   * @created_date: Mar 26, 2018
   * @modifier: hoan
   * @modifier_date: Mar 26, 2018
   * @param pageable
   * @param enabled
   * @return
   */
  @GetMapping(AppConstant.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(Pageable pageable,
      @RequestParam(value = AppConstant.PARAM.ENABLED_PARAM, required = false) String enabled) {
    try {
      Boolean newEnabled = (StringUtils.isEmpty(enabled)) ? null : Boolean.parseBoolean(enabled);
      Page<Supply> list = supplyService.findList(pageable, newEnabled);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Supply>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /save.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param supply
   * @param result
   * @return
   */
  @PostMapping(AppConstant.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated Supply supply,
      BindingResult result) {
    try {
      if (result.hasErrors() || !customValidation.isPhoneNumber(supply.getPhone()))
        return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      supply = supplyService.save(supply);
      if (supply != null)
        return new ResponseEntity<Supply>(supply, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NOT_SAVE, HttpStatus.BAD_REQUEST);
  }

  /**
   * @description: /enabled-or-not.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param id
   * @return
   */
  @GetMapping(AppConstant.API_URL.ENABLED_OR_NOT)
  public ResponseEntity<?> showOrNot(@RequestParam(AppConstant.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Supply supply = supplyService.enabledOrNot(newId);
      if (supply != null)
        return new ResponseEntity<Supply>(supply, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NOT_DISABLED, HttpStatus.BAD_REQUEST);
  }

  /**
   * @description: /find-by-name.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param name
   * @return
   */
  @GetMapping(AppConstant.API_URL.FIND_BY_NAME)
  public ResponseEntity<?> findByName(@RequestParam(AppConstant.PARAM.NAME_PARAM) String name) {
    try {
      Supply supply = supplyService.findByName(name);
      if (supply != null)
        return new ResponseEntity<Supply>(supply, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
