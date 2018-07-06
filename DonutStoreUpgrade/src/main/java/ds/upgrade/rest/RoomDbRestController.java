package ds.upgrade.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.User;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.ConstantWebSocket;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.ROOM_DB_MODEL)
public class RoomDbRestController {

  @Autowired
  private RoomDbService roomDbService;
  @Autowired
  private UserService userService;

  @GetMapping(AppConstant.API_URL.JOIN_ROOM)
  public ResponseEntity<?> joinRoom(@RequestParam String name) {
    try {
      User userRequest = userService.findInfoUser();
      if (userRequest.getSenderDbId() == null)
        return new ResponseEntity<String>(AppConstant.REPONSE.HAVE_NOT_PERMISSION,
            HttpStatus.NOT_ACCEPTABLE);
      RoomDb joinedRoom = roomDbService.joinRoom(name, userRequest);

      if (joinedRoom == null)
        return new ResponseEntity<String>(ConstantWebSocket.RESPONSE.NOT_JOINED_ROOM,
            HttpStatus.CONFLICT);

      return new ResponseEntity<RoomDb>(joinedRoom, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(AppConstant.API_URL.FIND_BY_USERS_IN_ROOM)
  public ResponseEntity<?> findByUsersInRoom(@RequestParam String senderPhone) {
    try {
      RoomDb foundRoom = roomDbService.findByUsersInRoom(senderPhone, userService.findInfoUser());
      if (foundRoom != null)
        return new ResponseEntity<RoomDb>(foundRoom, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
