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

import ds.upgrade.model.Staff;
import ds.upgrade.model.User;
import ds.upgrade.service.StaffService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.Constants;

/**
 * @description: /api/staff.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(Constants.API_URL.MAIN_API + Constants.MODEL.STAFF_MODEL)
public class StaffRestController {

  @Autowired
  private StaffService staffService;
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
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping(Constants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll() {
    try {
      List<Staff> list = staffService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Staff>>(list, HttpStatus.OK);
    } catch (Exception e) {
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
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(Constants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Staff staff = staffService.findOne(newId);
      if (staff != null)
        return new ResponseEntity<Staff>(staff, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(Constants.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(Pageable pageable,
      @RequestParam(value = Constants.PARAM.ENABLED_PARAM, required = false) String enabled,
      @RequestParam(value = Constants.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = Constants.PARAM.WORKING_CALENDER_ID_PARAM, required = false) String workingCalenderId) {
    try {
      User user = userService.findInfoUser();
      Long newStoreId = null;
      if (userService.isAdmin(user.getRoles())) {
        newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
      } else {
        newStoreId = user.getStoreId().getId();
      }
      Boolean newEnabled = (StringUtils.isEmpty(enabled)) ? null : Boolean.parseBoolean(enabled);
      Long newWorkingCalenderId = (StringUtils.isEmpty(workingCalenderId)) ? null : Long.parseLong(workingCalenderId);
      Page<Staff> list = staffService.findList(pageable, newEnabled, newStoreId, newWorkingCalenderId);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Staff>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /save.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param staff
   * @param result
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @PostMapping(Constants.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated Staff staff,
      BindingResult result) {
    try {
      if (result.hasErrors())
        return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      User user = userService.findInfoUser();
      //Store have only created your staff belong to your store
      if (userService.isStore(user.getRoles())) {
        staff.setStoreId(user.getStoreId());
      }
      staff = staffService.save(staff);
      if (staff != null)
        return new ResponseEntity<Staff>(staff, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NOT_SAVE, HttpStatus.BAD_REQUEST);
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
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(Constants.API_URL.ENABLED_OR_NOT)
  public ResponseEntity<?> showOrNot(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Staff staff = staffService.enabledOrNot(newId);
      if (staff != null)
        return new ResponseEntity<Staff>(staff, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NOT_SAVE, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * @description: /find-by-identity-card.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param name
   * @return
   */@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(Constants.API_URL.FIND_BY_IDENTITY_CARD)
  public ResponseEntity<?> findByName(@RequestParam(Constants.PARAM.IDENTITY_CARD_ID_PARAM) String identityCard) {
    try {
      Staff staff = staffService.findByIdentityCard(identityCard);
      if (staff != null)
        return new ResponseEntity<Staff>(staff, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}