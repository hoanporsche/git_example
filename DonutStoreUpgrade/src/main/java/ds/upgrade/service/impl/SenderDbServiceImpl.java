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
  public SenderDb saveOrUpdate(Sender sender) {
    
    return null;
  }

}
