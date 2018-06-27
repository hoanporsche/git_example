package ds.upgrade.service;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;

public interface RoomDbService {
  
  Page<RoomDb> findList(Pageable pageable, User user); 

  RoomDb create(SenderDb senderDb);
  
  RoomDb findByName(String name);
  
  RoomDb joinRoom(String name, User joinUser);
  
  boolean isUserInRoom(Set<SenderDb> senderInRoom, User user);
}
