package ds.upgrade.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstants;
import ds.upgrade.util.ConstantsWebSocket;

@RestController
@RequestMapping(AppConstants.API_URL.MAIN_API + AppConstants.MODEL.ROOM_DB_MODEL)
public class RoomDbRestController {

  @Autowired
  private RoomDbService roomDbService;
  @Autowired
  private SenderDbService senderDbService;
  @Autowired
  private UserService userService;

  @GetMapping(AppConstants.API_URL.JOIN_ROOM)
  public ResponseEntity<?> joinRoom(@RequestParam String name) {
    try {
      User userRequest = userService.findInfoUser();
      SenderDb foundSenderByUser = senderDbService.findByPhone(userRequest.getStoreId().getPhone());
      RoomDb joinedRoom = roomDbService.joinRoom(name, foundSenderByUser);
      
      if (joinedRoom == null)
        return new ResponseEntity<String>(ConstantsWebSocket.RESPONSE.NOT_JOINED_ROOM,
            HttpStatus.CONFLICT);
      
      return new ResponseEntity<RoomDb>(joinedRoom, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
