package ds.upgrade.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.NotificationDb;
import ds.upgrade.model.User;
import ds.upgrade.service.NotificationDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.Constants;

@RestController
@RequestMapping(Constants.API_URL.MAIN_API + Constants.MODEL.NOTIFICATION_DB_MODEL)
public class NotificationDbController {

  @Autowired
  private NotificationDbService notificationDbService;
  @Autowired
  private UserService userService;
  
  @GetMapping(Constants.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable) {
    User currentUser = userService.findInfoUser();
    Page<NotificationDb> list = notificationDbService.findList(pageable, currentUser.getEmail());
    return new ResponseEntity<Page<NotificationDb>>(list, HttpStatus.OK);
  }
  
  @GetMapping(Constants.API_URL.USER_HAS_SEEN)
  public ResponseEntity<?> userHasSeen(@RequestParam Long id) {
    NotificationDb seenNoti = notificationDbService.userHasSeen(id);
    if (seenNoti == null)
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR , HttpStatus.INTERNAL_SERVER_ERROR);
    return new ResponseEntity<NotificationDb>(seenNoti, HttpStatus.OK);
  }
}
