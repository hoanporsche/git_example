package ds.upgrade.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.service.SenderDbService;

@Service
public class SenderDbServiceImpl implements SenderDbService {

  @Autowired
  private SenderDbRepository senderDbRepository;
  
  @Override
  public SenderDb findByPhone(String phone) {
    return senderDbRepository.findByPhone(phone);
  }

  @Override
  public SenderDb create(Sender sender) {
    SenderDb senderDb = new SenderDb(sender.getName(), sender.getPhone());
    return senderDbRepository.save(senderDb);
  }

  @Override
  public SenderDb updateRoom(SenderDb senderDb, RoomDb newRoomDb) {
    Set<RoomDb> listRoomOfSender = senderDb.getRoomDbs();
    if (listRoomOfSender == null) {
      listRoomOfSender = new HashSet<>();
    }
    listRoomOfSender.add(newRoomDb);
    senderDb.setRoomDbs(listRoomOfSender);
    return senderDbRepository.save(senderDb);
  }

}
