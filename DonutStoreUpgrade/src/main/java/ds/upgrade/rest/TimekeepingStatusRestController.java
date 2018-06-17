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

import ds.upgrade.model.TimekeepingStatus;
import ds.upgrade.service.TimekeepingStatusService;
import ds.upgrade.util.AppConstants;

/**
 * @description: /api/timekeeping-status.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping(AppConstants.API_URL.MAIN_API + AppConstants.MODEL.TIMEKEEPING_STATUS_MODEL)
public class TimekeepingStatusRestController {

  @Autowired
  private TimekeepingStatusService timekeepingStatusService;

  /**
   * @description: /find-all.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @GetMapping(AppConstants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll() {
    try {
      List<TimekeepingStatus> list = timekeepingStatusService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<TimekeepingStatus>>(list, HttpStatus.OK);
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
  @GetMapping(AppConstants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(AppConstants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      TimekeepingStatus timekeepingStatus = timekeepingStatusService.findOne(newId);
      if (timekeepingStatus != null)
        return new ResponseEntity<TimekeepingStatus>(timekeepingStatus, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @GetMapping(AppConstants.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(Pageable pageable,
      @RequestParam(value = AppConstants.PARAM.ENABLED_PARAM, required = false) String enabled) {
    try {
      Boolean newEnabled = (StringUtils.isEmpty(enabled)) ? null : Boolean.parseBoolean(enabled);
      Page<TimekeepingStatus> list = timekeepingStatusService.findList(pageable, newEnabled);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<TimekeepingStatus>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /save.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param timekeepingStatus
   * @param result
   * @return
   */
  @PostMapping(AppConstants.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated TimekeepingStatus timekeepingStatus,
      BindingResult result) {
    try {
      if (result.hasErrors())
        return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      timekeepingStatus = timekeepingStatusService.save(timekeepingStatus);
      if (timekeepingStatus != null)
        return new ResponseEntity<TimekeepingStatus>(timekeepingStatus, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NOT_SAVE, HttpStatus.BAD_REQUEST);
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
  @GetMapping(AppConstants.API_URL.ENABLED_OR_NOT)
  public ResponseEntity<?> showOrNot(@RequestParam(AppConstants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      TimekeepingStatus timekeepingStatus = timekeepingStatusService.enabledOrNot(newId);
      if (timekeepingStatus != null)
        return new ResponseEntity<TimekeepingStatus>(timekeepingStatus, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @GetMapping(AppConstants.API_URL.FIND_BY_NAME)
  public ResponseEntity<?> findByName(@RequestParam(AppConstants.PARAM.NAME_PARAM) String name) {
    try {
      TimekeepingStatus timekeepingStatus = timekeepingStatusService.findByName(name);
      if (timekeepingStatus != null)
        return new ResponseEntity<TimekeepingStatus>(timekeepingStatus, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
