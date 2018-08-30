package ds.upgrade.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.User;
import ds.upgrade.model.json.JsonResponse;
import ds.upgrade.service.MessageDbService;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.MESSAGE_DB_MODEL)
public class MessageDbRestController {
  @Autowired
  private SimpMessagingTemplate template;

  @Autowired
  private MessageDbService messageDbService;
  @Autowired
  private RoomDbService roomDbService;
  @Autowired
  private UserService userService;

  /** Get all message in a room, check user has in the room and check input of
  * "roomName"
  */
  @GetMapping(AppConstant.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll(@RequestParam String roomName, Pageable pageable) {
    try {
      RoomDb foundRoom = roomDbService.findByName(roomName);
      User userRequest = userService.findInfoUser();
      /** Check input "roomName" and check user in the room, if conditions is the
      * truth, return not_accept
      */
      if (foundRoom == null || !roomDbService.isUserInRoom(foundRoom.getSenderDbs(), userRequest))
        return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT,
            HttpStatus.NOT_ACCEPTABLE);
      Page<MessageDb> listMessage = messageDbService.findAll(pageable, foundRoom.getName());
      if (listMessage.getContent() != null)
        return new ResponseEntity<Page<MessageDb>>(listMessage, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(AppConstant.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(@RequestParam String roomName, Pageable pageable) {
    try {
      User user = userService.findInfoUser();
      Page<MessageDb> listMessage = messageDbService.findList(pageable, roomName, user);
      if (listMessage.getContent() != null)
        return new ResponseEntity<Page<MessageDb>>(listMessage, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(AppConstant.API_URL.SEND_MESSAGE + AppConstant.PATH_PARAM.ROOM_NAME)
  public ResponseEntity<?> sendMessage(@PathVariable String roomName, @RequestBody String text) {
    try {
      User user = userService.findInfoUser();
      MessageDb messageDb = messageDbService.save(user, roomName, text);
      if (messageDb != null) {
        this.template.convertAndSend("/topic/room/" + roomName.trim(), messageDb);
        return new ResponseEntity<JsonResponse>(new JsonResponse("OK"), HttpStatus.OK);
      }
      return new ResponseEntity<String>(AppConstant.REPONSE.NOT_SAVE,
          HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
