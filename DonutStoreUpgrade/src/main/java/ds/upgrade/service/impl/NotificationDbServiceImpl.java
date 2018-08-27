package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import ds.upgrade.model.NotificationDb;
import ds.upgrade.model.Order;
import ds.upgrade.model.RoomDb;
import ds.upgrade.model.User;
import ds.upgrade.repository.NotificationDbRepository;
import ds.upgrade.repository.UserRepository;
import ds.upgrade.repository.specification.NotificationDbSpecification;
import ds.upgrade.service.NotificationDbService;
import ds.upgrade.util.ConstantWebSocket;

@Service
public class NotificationDbServiceImpl implements NotificationDbService {

  @Autowired
  private NotificationDbRepository notificationDbRepository;
  @Autowired
  private SimpMessagingTemplate template;
  @Autowired
  private UserRepository userRepository;

  @Override
  public void pushToAllUser(RoomDb roomDb) {
    List<User> listUser = userRepository.findAll();
    String text = ConstantWebSocket.RESPONSE.NEW_MESSAGE + roomDb.getName();
    for (User user : listUser) {
      NotificationDb newNoti = new NotificationDb(user, text);
      newNoti = notificationDbRepository.save(newNoti);
      template.convertAndSend("/topic/notification/" + user.getEmail(), newNoti);
    }
  }

  @Override
  public NotificationDb save(String text, User user) {
    NotificationDb notificationDb = new NotificationDb(user, text);
    notificationDb = notificationDbRepository.save(notificationDb);
    if (notificationDb != null) {
      this.template.convertAndSend("/topic/notification/" + user.getEmail(), notificationDb);
      return notificationDb;
    }
    return null;
  }

  /**
   * @description: user track only their message.
   * @author: hoan
   * @created_time: Jun 12, 2018
   * @param pageable
   * @return
   */
  @Override
  public Page<NotificationDb> findList(Pageable pageable, String email) {
    Specification<NotificationDb> spec = new NotificationDbSpecification(email);
    return notificationDbRepository.findAll(spec, pageable);
  }

  @Override
  public NotificationDb userHasSeen(Long id) {
    NotificationDb foundNotificationDb = notificationDbRepository.findOne(id);
    if (foundNotificationDb != null) {
      foundNotificationDb.setSeen(true);
      return notificationDbRepository.save(foundNotificationDb);
    }
    return null;
  }

  @Override
  public Integer countNotSeenNoti(long userId) {
    Integer counted = notificationDbRepository.countNotSeenNoti(userId);
    return (counted == null) ? 0 : counted;
  }

  @Override
  public void pushNewOrderToUser(Order order) {
    String text = ConstantWebSocket.RESPONSE.NEW_ORDER + order.getCode();
    for (User user : order.getStoreId().getUsers()) {
      NotificationDb newNoti = new NotificationDb(user, text);
      newNoti = notificationDbRepository.save(newNoti);
      template.convertAndSend("/topic/notification/" + user.getEmail(), newNoti);
    }    
  }

}
