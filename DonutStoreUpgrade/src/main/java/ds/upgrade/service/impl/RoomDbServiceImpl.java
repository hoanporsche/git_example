package ds.upgrade.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.repository.RoomDbRepository;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.util.ConstantsWebSocket;

@Service
public class RoomDbServiceImpl implements RoomDbService {

  @Autowired
  private RoomDbRepository roomDbRepository;

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
