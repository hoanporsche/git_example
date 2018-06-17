package ds.upgrade.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.User;
import ds.upgrade.model.support.Sender;

public interface MessageDbService {

  Page<MessageDb> findList(Pageable pageable, String roomName, User user);
  
  MessageDb save(Sender sender, String roomName, String text);
  
  MessageDb save(User user, String roomName, String text);
}
