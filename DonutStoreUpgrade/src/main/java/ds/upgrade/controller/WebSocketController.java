package ds.upgrade.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Message;
import ds.upgrade.model.support.OutputMessage;
import ds.upgrade.service.MessageDbService;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.util.Constants;

@Controller
public class WebSocketController {

  private SimpMessagingTemplate template;

  @Autowired
  public WebSocketController(SimpMessagingTemplate template) {
    this.template = template;
  }

  @Autowired
  private MessageDbService messageDbService;
  @Autowired
  private SenderDbService senderDbService;
  @Autowired
  private RoomDbService roomDbService;

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

  /**
   * @description: .
   * @author: hoan
   * @created_time: May 29, 2018
   * @param message
   * @param result
   * @return
   * @throws Exception
   */
  @MessageMapping("/chat/new-chat")
  @SendTo("/topic/all-messages")
  public OutputMessage newChat(@Validated Message message, BindingResult result) throws Exception {
    if (result.hasErrors())
      return new OutputMessage(null, Constants.REPONSE.WRONG_INPUT, new Date());
    
    SenderDb senderDb = senderDbService.findByPhone(message.getFrom().getPhone());
    // create new SenderDb if senderDb is null
    if (senderDb == null) {
      senderDb = senderDbService.create(message.getFrom());
    }
    //Create new room from senderDb
    RoomDb roomDb = roomDbService.createOrUpdate(senderDb);
    //Update room to user
    senderDb = senderDbService.updateRoom(senderDb, roomDb);
    //Save message to database
    MessageDb messageDb = messageDbService.save(senderDb, roomDb, message.getText());
    //send message to room chat
    this.template.convertAndSend("/topic/room/" + roomDb.getName(), new OutputMessage(messageDb));
    return null;
  }

  @MessageMapping("/chat/room/{name}")
  public void chatRoom(@DestinationVariable String name, Message message) throws Exception {
//    MessageDb messageDb = messageDbService.save(message);
//    OutputMessage outputMessage = new OutputMessage(messageDb);
//    this.template.convertAndSend("/topic/room/" + name, outputMessage);
  }
}
