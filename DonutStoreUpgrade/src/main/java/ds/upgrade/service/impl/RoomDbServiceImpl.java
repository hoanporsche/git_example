package ds.upgrade.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.repository.RoomDbRepository;
import ds.upgrade.service.RoomDbService;

@Service
public class RoomDbServiceImpl implements RoomDbService {
  
  @Autowired
  private RoomDbRepository roomDbRepository;

  @Override
  public RoomDb createOrUpdate(SenderDb senderDb) {
    RoomDb roomDb = roomDbRepository.findByName(senderDb.getName() + "-" + senderDb.getPhone());
    if (roomDb == null) 
      roomDb = roomDbRepository.save(new RoomDb(senderDb.getName() + "-" + senderDb.getPhone()));
    return roomDb;
  }

}
