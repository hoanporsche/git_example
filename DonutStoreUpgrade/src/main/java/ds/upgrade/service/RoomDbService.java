package ds.upgrade.service;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;

public interface RoomDbService {

  RoomDb create(SenderDb senderDb);
  
  RoomDb findByName(String name);
  
  RoomDb joinRoom(String name, SenderDb joinSender);
}
