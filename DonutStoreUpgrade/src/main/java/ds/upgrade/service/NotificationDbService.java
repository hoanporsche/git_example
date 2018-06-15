package ds.upgrade.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.NotificationDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.User;

public interface NotificationDbService {

  public void pushToAllUser(RoomDb roomDb);
  
  public NotificationDb save(String text, User user);
  
  public Page<NotificationDb> findList(Pageable pageable, String email);
  
  public NotificationDb userHasSeen(Long id);
}
