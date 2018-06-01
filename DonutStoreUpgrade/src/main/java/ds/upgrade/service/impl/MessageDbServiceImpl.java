package ds.upgrade.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ds.upgrade.model.MessageDb;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.SenderDb;
import ds.upgrade.repository.MessageDbRepository;
import ds.upgrade.service.MessageDbService;

@Service
public class MessageDbServiceImpl implements MessageDbService {

  @Autowired
  private MessageDbRepository messageDbRepository;

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
  public MessageDb save(SenderDb senderDb, RoomDb roomDb, String message) {
    MessageDb messageDb = new MessageDb(senderDb, roomDb, message.trim());
    return messageDbRepository.save(messageDb);
  }

}
