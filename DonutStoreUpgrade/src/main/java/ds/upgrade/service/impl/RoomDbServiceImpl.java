package ds.upgrade.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.repository.RoomDbRepository;
import ds.upgrade.repository.specification.RoomDbSpecification;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.util.ConstantsWebSocket;

@Service
public class RoomDbServiceImpl implements RoomDbService {

  @Autowired
  private RoomDbRepository roomDbRepository;

  @Override
  public Page<RoomDb> findList(Pageable pageable, User user) {
    String senderPhone = user.getStoreId().getPhone();
    Specification<RoomDb> spec = new RoomDbSpecification(senderPhone);
    return roomDbRepository.findAll(spec, pageable);
  }

  @Override
  public RoomDb create(SenderDb senderDb) {
    RoomDb roomDb = new RoomDb(senderDb.getName().trim() + "-" + senderDb.getPhone().trim());
    Set<SenderDb> listSenderInRoom = new HashSet<>();
    listSenderInRoom.add(senderDb);
    roomDb.setSenderDbs(listSenderInRoom);
    return roomDbRepository.save(roomDb);
  }

  @Override
  public RoomDb findByName(String name) {
    return roomDbRepository.findByName(name);
  }

  @Override
  public RoomDb joinRoom(String name, SenderDb joinSender) {
    RoomDb foundRoom = roomDbRepository.findByName(name);
    if (foundRoom != null) {
      Set<SenderDb> listSenderInRoom = foundRoom.getSenderDbs();
      if (listSenderInRoom.size() < ConstantsWebSocket.PARAM.ROOM_NUMBER_USER) {
        listSenderInRoom.add(joinSender);
        foundRoom.setSenderDbs(listSenderInRoom);
        return roomDbRepository.save(foundRoom);
      }
    }
    return null;
  }

}
