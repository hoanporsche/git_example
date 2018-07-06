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
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.repository.specification.RoomDbSpecification;
import ds.upgrade.service.RoomDbService;
import ds.upgrade.util.ConstantWebSocket;

@Service
public class RoomDbServiceImpl implements RoomDbService {

  @Autowired
  private RoomDbRepository roomDbRepository;
  @Autowired
  private SenderDbRepository senderDbRepository;

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

  /**
   * @description: find room
   * @author: VDHoan
   * @created_date: Jul 6, 2018
   * @param name
   * @param joinSender
   * @return: find a room by 2 users in room, if the room is not exists, 
   *          create a new room.
   */
  @Override
  public RoomDb findByUsersInRoom(String senderPhone, User user) {
    SenderDb senderDb1 = user.getSenderDbId();
    SenderDb senderDb2 = senderDbRepository.findByPhone(senderPhone);
    if (senderDb2 == null) 
      return null;
    for (RoomDb roomDb1 : senderDb1.getRoomDbs()) {
      for (RoomDb roomDb2 : senderDb2.getRoomDbs()) {
        if (roomDb1.getId() == roomDb2.getId()) {
          return roomDb2;
        }
      }
    }
    RoomDb newRoom = new RoomDb(senderDb1.getName() + "-" + senderDb2.getName());
    Set<SenderDb> list = new HashSet<>();
    list.add(senderDb1);
    list.add(senderDb2);
    newRoom.setSenderDbs(list);
    return roomDbRepository.save(newRoom);
  }

  /**
   * @description: join one sender to a room.
   * @author: VDHoan
   * @created_date: Jun 21, 2018
   * @param name
   * @param joinSender
   * @return: if sender is joining room, return roomDb; else if sender's not
   *          joining, check number of member, if it's more than 2, return null,
   *          else we join sender.
   */
  @Override
  public RoomDb joinRoom(String name, User joinUser) {
    RoomDb foundRoom = roomDbRepository.findByName(name);
    if (foundRoom != null) {
      Set<SenderDb> listSenderInRoom = foundRoom.getSenderDbs();
      if (this.isUserInRoom(listSenderInRoom, joinUser))
        return foundRoom;
      if (listSenderInRoom.size() < ConstantWebSocket.PARAM.ROOM_NUMBER_USER) {
        listSenderInRoom.add(joinUser.getSenderDbId());
        foundRoom.setSenderDbs(listSenderInRoom);
        return roomDbRepository.save(foundRoom);
      }
    }
    return null;
  }

  @Override
  public boolean isUserInRoom(Set<SenderDb> senderInRoom, User user) {
    for (SenderDb senderDb : senderInRoom) {
      if (senderDb.getId() == user.getSenderDbId().getId())
        return true;
    }
    return false;
  }

}
