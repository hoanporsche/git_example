package ds.upgrade.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.SENDER_DB_MODEL)
public class SenderDbRestController {

  @Autowired
  private SenderDbService senderDbService;
  @Autowired
  private UserService userService;

  @GetMapping(AppConstant.API_URL.FIND_ALL_INTERNAL)
  public ResponseEntity<?> findAllInternal(Pageable pageable) {
    try {
      Page<SenderDb> list = senderDbService.findAllInternal(userService.findInfoUser(), pageable);
      if (list != null)
        return new ResponseEntity<Page<SenderDb>>(list, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping(AppConstant.API_URL.FIND_ALL_NOT_INTERNAL_IN_24H)
  public ResponseEntity<?> findAllNotInternalIn24h(Pageable pageable) {
    try {
      Page<SenderDb> list = senderDbService.findAllNotInternalIn24h(pageable);
      if (list != null)
        return new ResponseEntity<Page<SenderDb>>(list, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping(AppConstant.API_URL.FIND_ALL_NOT_INTERNAL)
  public ResponseEntity<?> findAllNotInternal(Pageable pageable) {
    try {
      Page<SenderDb> list = senderDbService.findAllNotInternal(pageable);
      if (list != null)
        return new ResponseEntity<Page<SenderDb>>(list, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(AppConstant.API_URL.FIND_ALL_NOT_INTERNAL_IN_24H_IN_CHARGE_OF_USER)
  public ResponseEntity<?> findAllNotInternalIn24HInChargeOfUser(Pageable pageable) {
    try {
      User user = userService.findInfoUser();
      Page<SenderDb> list = senderDbService.findAllNotInternalIn24HInChargeOfUser(pageable, user);
      if (list != null)
        return new ResponseEntity<Page<SenderDb>>(list, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + " " + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
