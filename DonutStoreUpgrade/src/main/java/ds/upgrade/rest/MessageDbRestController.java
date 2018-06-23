package ds.upgrade.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.User;
import ds.upgrade.service.MessageDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstants;

@RestController
@RequestMapping(AppConstants.API_URL.MAIN_API + AppConstants.MODEL.MESSAGE_DB_MODEL)
public class MessageDbRestController {

  @Autowired
  private MessageDbService messageDbService;
  @Autowired
  private UserService userService;
  
  @GetMapping(AppConstants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll(@RequestParam String roomName, Pageable pageable) {
    try {
      Page<MessageDb> listMessage = messageDbService.findAll(pageable, roomName);
      if (listMessage.getContent() != null)
        return new ResponseEntity<Page<MessageDb>>(listMessage, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(AppConstants.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(@RequestParam String roomName, Pageable pageable) {
    try {
      User user = userService.findInfoUser();
      Page<MessageDb> listMessage = messageDbService.findList(pageable, roomName, user);
      if (listMessage.getContent() != null)
        return new ResponseEntity<Page<MessageDb>>(listMessage, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(AppConstants.API_URL.SEND_MESSAGE + AppConstants.PATH_PARAM.ROOM_NAME)
  public ResponseEntity<?> sendMessage(@PathVariable String roomName, @RequestBody String text) {
    try {
      User user = userService.findInfoUser();
      MessageDb messageDb = messageDbService.save(user, roomName, text);
      if (messageDb != null)
        return new ResponseEntity<MessageDb>(messageDb, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstants.REPONSE.NOT_SAVE,
          HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
