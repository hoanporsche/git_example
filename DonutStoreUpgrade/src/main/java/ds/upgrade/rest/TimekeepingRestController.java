/**
 * 
 */
package ds.upgrade.rest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

import ds.upgrade.model.Timekeeping;
import ds.upgrade.model.User;
import ds.upgrade.service.TimekeepingService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;

/**
 * @description: /api/timekeeping.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.TIMEKEEPING_MODEL)
public class TimekeepingRestController {

  @Autowired
  private TimekeepingService timekeepingService;
  @Autowired
  private UserService userService;

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
      List<Timekeeping> list = timekeepingService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Timekeeping>>(list, HttpStatus.OK);
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
      Timekeeping timekeeping = timekeepingService.findOne(newId);
      if (timekeeping != null)
        return new ResponseEntity<Timekeeping>(timekeeping, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 29, 2018
   * @modifier: hoan
   * @modifier_date: Mar 29, 2018
   * @param statusId
   * @param staffId
   * @param storeId
   * @param startDate
   * @param endDate
   * @param pageable
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(AppConstant.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(
      @RequestParam(value = AppConstant.PARAM.STATUS_ID_PARAM, required = false) String statusId,
      @RequestParam(value = AppConstant.PARAM.STAFF_ID_PARAM, required = false) String staffId,
      @RequestParam(value = AppConstant.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = AppConstant.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstant.PARAM.END_DATE_PARAM, required = false) String endDate,
      Pageable pageable) {
    try {
      User user = userService.findInfoUser();
      Long newStoreId;
      //Admin can overwatch all orders and Store have just overwatch all orders belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreId = user.getStoreId().getId();
      } else {
        newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
      }
      SimpleDateFormat format = new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1);
      Long newStatusId = (StringUtils.isEmpty(statusId)) ? null : Long.parseLong(statusId);
      Long newStaffId = (StringUtils.isEmpty(staffId)) ? null : Long.parseLong(staffId);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      
      Page<Timekeeping> list = timekeepingService.findList(newStatusId, newStaffId, newStoreId, newStartDate, newEndDate, pageable);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Timekeeping>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT + e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
