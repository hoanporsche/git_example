package ds.upgrade.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;

public interface MessageDbService {

  Page<MessageDb> findAll(Pageable pageable);
  
  MessageDb save(SenderDb senderDb, RoomDb roomDb, String text);
  
  MessageDb save(Sender sender, String roomName, String text);
}
