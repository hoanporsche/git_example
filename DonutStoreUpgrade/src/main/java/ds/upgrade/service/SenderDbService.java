package ds.upgrade.service;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;

public interface SenderDbService {

  public SenderDb findByPhone(String phone);
  
  public SenderDb createOrUpdate(Sender sender);
}
