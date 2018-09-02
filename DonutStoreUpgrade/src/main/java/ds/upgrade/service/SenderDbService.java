package ds.upgrade.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.model.json.Sender;

public interface SenderDbService {

  Page<SenderDb> findAllInternal(User user, Pageable pageable);

  Page<SenderDb> findAllNotInternalIn24h(Pageable pageable);

  Page<SenderDb> findAllNotInternal(Pageable pageable);

  Page<SenderDb> findAllNotInternalIn24HInChargeOfUser(Pageable pageable, User user);

  public SenderDb findByPhone(String phone);

  public SenderDb createOrUpdate(Sender sender);

  public void createByUser(User user);
}
