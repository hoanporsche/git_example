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
import ds.upgrade.util.AppConstant;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.NOTIFICATION_DB_MODEL)
public class NotificationDbRestController {

  @Autowired
  private NotificationDbService notificationDbService;
  @Autowired
  private UserService userService;

  @GetMapping(AppConstant.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable) {
    try {
      User currentUser = userService.findInfoUser();
      Page<NotificationDb> list = notificationDbService.findList(pageable, currentUser.getEmail());
      return new ResponseEntity<Page<NotificationDb>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(AppConstant.API_URL.USER_HAS_SEEN)
  public ResponseEntity<?> userHasSeen(@RequestParam Long id) {
    try {
      NotificationDb seenNoti = notificationDbService.userHasSeen(id);
      if (seenNoti == null)
        return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR);
      return new ResponseEntity<NotificationDb>(seenNoti, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
