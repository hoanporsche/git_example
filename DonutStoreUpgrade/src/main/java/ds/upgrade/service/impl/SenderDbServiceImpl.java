package ds.upgrade.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.repository.specification.SenderDbSpecification;
import ds.upgrade.service.SenderDbService;

@Service
public class SenderDbServiceImpl implements SenderDbService {

  @Autowired
  private SenderDbRepository senderDbRepository;

  @Override
  public Page<SenderDb> findAllInternal(Pageable pageable) {
    Specification<SenderDb> spec = new SenderDbSpecification(Boolean.TRUE);
    return senderDbRepository.findAll(spec, pageable);
  }

  @Override
  public Page<SenderDb> findAllNotInternalToday(Pageable pageable) {
    Date todayDate = new Date();
    @SuppressWarnings("deprecation")
    Date startDate = new Date(todayDate.getYear(), todayDate.getMonth(), todayDate.getDate(), 0,0,0);
    @SuppressWarnings("deprecation")
    Date endDate = new Date(todayDate.getYear(), todayDate.getMonth(), todayDate.getDate(), 23, 59, 59);
    Specification<SenderDb> spec = new SenderDbSpecification(startDate, endDate, Boolean.FALSE);
    return senderDbRepository.findAll(spec, pageable);
  }

  @Override
  public Page<SenderDb> findAllNotInternal(Pageable pageable) {
    Specification<SenderDb> spec = new SenderDbSpecification(Boolean.FALSE);
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
