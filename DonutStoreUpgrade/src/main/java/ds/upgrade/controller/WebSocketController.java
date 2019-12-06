package ds.upgrade.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.json.Message;
import ds.upgrade.model.json.OutputMessage;
import ds.upgrade.model.json.Sender;
import ds.upgrade.service.MessageDbService;
import ds.upgrade.service.NotificationDbService;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.util.AppConstant;

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

  @GetMapping("/web-socket")
  public String webSocket() {
    return "web-socket";
  }

  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public OutputMessage send(Message message) throws Exception {
    String time = new SimpleDateFormat("HH:mm").format(new Date());
    System.out.println(message);
    return new OutputMessage(message.getSenderDb(), message.getText(), time);
  }
  
  @PostMapping("/create-room")
  public @ResponseBody ResponseEntity<?> createRoom(@RequestBody @Validated Sender sender, BindingResult result) {
    if (result.hasErrors())
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.BAD_REQUEST);
    try {
      SenderDb senderDb = senderDbService.createOrUpdate(sender);
      //Create new room from senderDb
      RoomDb roomDb = roomDbService.create(senderDb);
      //push to all user
      notificationDbService.pushToAllUser(roomDb);
      //send message to all user
      return new ResponseEntity<RoomDb>(roomDb, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessageMapping("/chat/room/{name}")
  public void chatRoom(@DestinationVariable String name, Message message) throws Exception {
    MessageDb messageDb = messageDbService.save(message.getSenderDb(), name, message.getText());
    this.template.convertAndSend("/topic/room/" + name.trim(), messageDb);
  }

  @GetMapping("/403")
  public String accessDenied() {
    return "403";
  }

  @GetMapping("/login")
  public String getLogin(Model model, Authentication auth) {
    return "login";
  }

  /**.
   * @author HoanVD - 31/10/2017.
   * @param request .
   * @param response .
   * @param session .
   * @return.
   */
  @GetMapping("/logout")
  public String logout(HttpServletRequest request, HttpServletResponse response,
      HttpSession session) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      new SecurityContextLogoutHandler().logout(request, response, auth);
    }
    return "redirect:/";
  }

  @GetMapping("/test")
  public String test() {
    return "index";
  }
}
