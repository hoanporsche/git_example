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
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.User;
import ds.upgrade.service.UserService;
import ds.upgrade.util.Constants;

/**
 * @description: /api/user.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(Constants.API_URL.MAIN_API + Constants.MODEL.USER_MODEL)
public class UserRestController {

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
  @GetMapping(Constants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll() {
    try {
      List<User> list = userService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<User>>(list, HttpStatus.OK);
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
  @GetMapping(Constants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      User user = userService.findOne(newId);
      if (user != null)
        return new ResponseEntity<User>(user, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /find-by-email.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @GetMapping(Constants.API_URL.FIND_BY_EMAIL)
  public ResponseEntity<?> findByEmail(@RequestParam(Constants.PARAM.EMAIL_PARAM) String email) {
    try {
      User user = userService.findByEmail(email);
      if (user != null)
        return new ResponseEntity<User>(user, HttpStatus.OK);
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
  @GetMapping(Constants.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(Pageable pageable,
      @RequestParam(value = Constants.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = Constants.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = Constants.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = Constants.PARAM.ROLE_ID_PARAM, required = false) String roleId) {
    try {
      SimpleDateFormat format = new SimpleDateFormat(Constants.FORMAT.DATE_FORMAT);
      Long newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      Long newRoleId = (StringUtils.isEmpty(roleId)) ? null : Long.parseLong(roleId);
      Page<User> list = userService.findList(pageable, newStoreId, newStartDate, newEndDate,
          newRoleId);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<User>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /reset-password.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @GetMapping(Constants.API_URL.RESET_PASSWORD)
  public ResponseEntity<?> resetPassword(@RequestParam(Constants.PARAM.EMAIL_PARAM) String email) {
    try {
      User user = userService.resetPassword(email);
      if (user != null)
        return new ResponseEntity<User>(user, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  @GetMapping(Constants.API_URL.ENABLED_OR_NOT)
  public ResponseEntity<?> showOrNot(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      User user = userService.enabledOrNot(newId);
      if (user != null)
        return new ResponseEntity<User>(user, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NOT_SAVE, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @PostMapping(Constants.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated User user, BindingResult result) {
    try {
      if (result.hasErrors())
        return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      user = userService.save(user);
      if (user != null)
        return new ResponseEntity<User>(user, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NOT_SAVE, HttpStatus.BAD_REQUEST);
  }
}
