package ds.upgrade.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.model.support.Message;
import ds.upgrade.model.support.OutputMessage;

@Controller
public class WebSocketController {

  @GetMapping("/")
  public String webSocket() {
    return "web-socket";
  }
  
  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public OutputMessage send(Message message) throws Exception {
      String time = new SimpleDateFormat("HH:mm").format(new Date());
      return new OutputMessage(message.getFrom(), message.getText(), time);
  }

}
