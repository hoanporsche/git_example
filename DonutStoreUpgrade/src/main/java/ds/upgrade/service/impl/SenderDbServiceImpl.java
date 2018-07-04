package ds.upgrade.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.User;
import ds.upgrade.model.support.Sender;
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.repository.specification.SenderDbSpecification;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.service.UserService;

@Service
public class SenderDbServiceImpl implements SenderDbService {

  @Autowired
  private SenderDbRepository senderDbRepository;
  @Autowired
  private UserService userService;

  /**
   * @description: if user is ADMIN, find all. If it's not ADMIN, find all except this user.
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   */
  @Override
  public Page<SenderDb> findAllInternal(User user, Pageable pageable) {
    Specification<SenderDb> spec = null;
    if (userService.isAdmin(user.getRoles())) {
      spec = new SenderDbSpecification(Boolean.TRUE);
    } else {
      spec = new SenderDbSpecification(Boolean.TRUE, user);
    }
    return senderDbRepository.findAll(spec, pageable);
  }

  @Override
  public Page<SenderDb> findAllNotInternalIn24h(Pageable pageable) {
    Date endDate = new Date();
    Date startDate = new Date(endDate.getTime() - (1000 * 60 * 60 * 24));
    Specification<SenderDb> spec = new SenderDbSpecification(startDate, endDate, Boolean.FALSE);
    return senderDbRepository.findAll(spec, pageable);
  }

  @Override
  public Page<SenderDb> findAllNotInternal(Pageable pageable) {
    Specification<SenderDb> spec = new SenderDbSpecification(Boolean.FALSE);
    return senderDbRepository.findAll(spec, pageable);
  }

  @Override
  public Page<SenderDb> findAllNotInternalIn24HInChargeOfUser(Pageable pageable, User user) {
    Date endDate = new Date();
    Date startDate = new Date(endDate.getTime() - (1000 * 60 * 60 * 24));
    Specification<SenderDb> spec = new SenderDbSpecification(startDate, endDate, Boolean.FALSE, user.getSenderDbId());
    return senderDbRepository.findAll(spec, pageable);
  }
  
  @Override
  public SenderDb findByPhone(String phone) {
    return senderDbRepository.findByPhone(phone);
  }

  @Override
  public SenderDb createOrUpdate(Sender sender) {
    SenderDb foundSender = senderDbRepository.findByPhone(sender.getPhone().trim());
    SenderDb senderDb = new SenderDb(sender.getName().trim(), sender.getPhone().trim());
    if (foundSender != null) {
      senderDb.setId(foundSender.getId());
    }
    return senderDbRepository.save(senderDb);
  }
}
