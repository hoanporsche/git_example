package ds.upgrade.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;
import ds.upgrade.repository.MessageDbRepository;
import ds.upgrade.repository.RoomDbRepository;
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.service.MessageDbService;

@Service
public class MessageDbServiceImpl implements MessageDbService {

  @Autowired
  private MessageDbRepository messageDbRepository;
  @Autowired
  private RoomDbRepository roomDbRepository;
  @Autowired
  private SenderDbRepository senderDbRepository;

  /**
   * @description: find all messages with pageable.
   * @author: hoan
   * @created_time: May 25, 2018
   * @param pageable
   * @return
   */
  @Override
  public Page<MessageDb> findAll(Pageable pageable) {
    return messageDbRepository.findAll(pageable);
  }

  /**
   * @description: save message to db.
   * @author: hoan
   * @created_time: May 25, 2018
   * @param message:
   *          keep a sender and a message to save them in DB
   * @return: a MessageDb Object
   */
  @Override
  public MessageDb save(SenderDb senderDb, RoomDb roomDb, String text) {
    //check sender is in room
    Set<RoomDb> listRoomOfSender = senderDb.getRoomDbs();
    for(RoomDb room: listRoomOfSender) {
      if (room.getId() == roomDb.getId()) {
        MessageDb messageDb = new MessageDb(senderDb, roomDb, text.trim());
        return messageDbRepository.save(messageDb);
      }
    }
    return null;
  }

  @Override
  public MessageDb save(Sender sender, String roomName, String text) {
    RoomDb roomDb = roomDbRepository.findByName(roomName);
    SenderDb senderDb = senderDbRepository.findByPhone(sender.getPhone());
  //check sender is in room
    Set<RoomDb> listRoomOfSender = senderDb.getRoomDbs();
    for(RoomDb room: listRoomOfSender) {
      if (room.getId() == roomDb.getId()) {
        MessageDb messageDb = new MessageDb(senderDb, roomDb, text.trim());
        return messageDbRepository.save(messageDb);
      }
    }
    return null;
  }

}
