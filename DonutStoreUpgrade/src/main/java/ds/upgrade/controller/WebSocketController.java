package ds.upgrade.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.model.support.Message;
import ds.upgrade.model.support.OutputMessage;
import ds.upgrade.model.support.Sender;
import ds.upgrade.service.MessageDbService;
import ds.upgrade.service.NotificationDbService;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.Constants;
import ds.upgrade.util.ConstantsWebSocket;

@Controller
public class WebSocketController {
  @Autowired
  private SimpMessagingTemplate template;

  @Autowired
  private MessageDbService messageDbService;
  @Autowired
  private SenderDbService senderDbService;
  @Autowired
  private RoomDbService roomDbService;
  @Autowired
  private NotificationDbService notificationDbService;
  @Autowired
  private UserService userService;

  @GetMapping("/")
  public String webSocket() {
    return "web-socket";
  }

  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public OutputMessage send(Message message) throws Exception {
    String time = new SimpleDateFormat("HH:mm").format(new Date());
    System.out.println(message);
    return new OutputMessage(message.getFrom(), message.getText(), time);
  }
  
  @PostMapping("/create-room")
  public @ResponseBody ResponseEntity<?> createRoom(@RequestBody @Validated Sender sender, BindingResult result) {
    if (result.hasErrors())
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.BAD_REQUEST);
    
    SenderDb senderDb = senderDbService.findByPhone(sender.getPhone());
    // create new SenderDb if senderDb is null
    if (senderDb == null) {
      senderDb = senderDbService.create(sender);
    }
    //Create new room from senderDb
    RoomDb roomDb = roomDbService.createOrUpdate(senderDb);
    //Update room to user
    senderDb = senderDbService.updateRoom(senderDb, roomDb);
    //push to all user
    notificationDbService.pushToAllUser(roomDb);
    roomDb = roomDbService.findByName(roomDb.getName());
    //send message to all user
    return new ResponseEntity<RoomDb>(roomDb, HttpStatus.OK);
  }
  
  @PostMapping("/join-room")
  public @ResponseBody ResponseEntity<?> joinRoom(@RequestBody String name) {
    User userRequest = userService.findInfoUser();
    SenderDb foundSenderByUser = senderDbService.findByPhone(userRequest.getStoreId().getPhone());
    RoomDb joinedRoom = roomDbService.joinRoom(name, foundSenderByUser);
    if (joinedRoom == null)
      return new ResponseEntity<String>(ConstantsWebSocket.RESPONSE.NOT_JOINED_ROOM, HttpStatus.CONFLICT);
    return new ResponseEntity<RoomDb>(joinedRoom, HttpStatus.OK);
  }
  
//  @PostMapping("/join-room")
  

  @MessageMapping("/chat/room/{name}")
  public void chatRoom(@DestinationVariable String name, Message message) throws Exception {
    MessageDb messageDb = messageDbService.save(message.getFrom(), name, message.getText());
    this.template.convertAndSend("/topic/room/" + name, new OutputMessage(messageDb));
  }
}
