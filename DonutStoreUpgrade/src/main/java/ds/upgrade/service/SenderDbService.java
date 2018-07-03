package ds.upgrade.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;

public interface SenderDbService {
  
  Page<SenderDb> findAllInternal(Pageable pageable);
  
  Page<SenderDb> findAllNotInternalToday(Pageable pageable);
  
  Page<SenderDb> findAllNotInternal(Pageable pageable);

  public SenderDb findByPhone(String phone);
  
  public SenderDb createOrUpdate(Sender sender);
}
