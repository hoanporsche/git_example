package ds.upgrade.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;
import ds.upgrade.repository.SenderDbRepository;
import ds.upgrade.service.SenderDbService;

@Service
public class SenderDbServiceImpl implements SenderDbService {

  @Autowired
  private SenderDbRepository senderDbRepository;
  
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
