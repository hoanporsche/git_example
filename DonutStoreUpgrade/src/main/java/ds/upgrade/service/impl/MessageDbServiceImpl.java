package ds.upgrade.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.model.support.Sender;
import ds.upgrade.repository.MessageDbRepository;
import ds.upgrade.repository.RoomDbRepository;
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.repository.specification.MessageDbSpecification;
import ds.upgrade.service.MessageDbService;

@Service
public class MessageDbServiceImpl implements MessageDbService {

  @Autowired
  private MessageDbRepository messageDbRepository;
  @Autowired
  private RoomDbRepository roomDbRepository;
  @Autowired
  private SenderDbRepository senderDbRepository;

  @Override
  public Page<MessageDb> findAll(Pageable pageable, String roomName) {
    Specification<MessageDb> spec = new MessageDbSpecification(roomName.trim());
    return messageDbRepository.findAll(spec, pageable);
  }

  /**
   * @description: find all messages with pageable.
   * @author: hoan
   * @created_time: May 25, 2018
   * @param pageable
   * @return
   */
  @Override
  public Page<MessageDb> findList(Pageable pageable, String roomName, User user) {
    String senderPhone = senderDbRepository.findByPhone(user.getStoreId().getPhone()).getPhone();
    Specification<MessageDb> spec = new MessageDbSpecification(roomName.trim(), senderPhone.trim());
    return messageDbRepository.findAll(spec, pageable);
  }

  @Override
  public MessageDb save(Sender sender, String roomName, String text) {
    RoomDb roomDb = roomDbRepository.findByName(roomName.trim());
    SenderDb senderDb = senderDbRepository.findByPhone(sender.getPhone().trim());
    // check sender is in room
    Set<SenderDb> listSenderOfRoom = roomDb.getSenderDbs();
    for (SenderDb s : listSenderOfRoom) {
      if (s.getId() == senderDb.getId()) {
        // MessageDb messageDb = new MessageDb(new SenderDb(senderDb.getId()),
        // new RoomDb(roomDb.getId()), text.trim());
        MessageDb messageDb = new MessageDb(senderDb, roomDb, text.trim());
        return messageDbRepository.save(messageDb);
      }
    }
    return null;
  }

  @Override
  public MessageDb save(User user, String roomName, String text) {
    RoomDb roomDb = roomDbRepository.findByName(roomName.trim());
    SenderDb senderDb = senderDbRepository.findByPhone(user.getStoreId().getPhone().trim());
    if (roomDb != null && senderDb != null) {
      MessageDb messageDb = new MessageDb(senderDb, roomDb, text.trim());
      return messageDbRepository.save(messageDb);
    }
    return null;
  }

}
