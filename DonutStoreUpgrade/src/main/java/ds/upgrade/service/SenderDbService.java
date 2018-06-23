package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.SenderDb;
import ds.upgrade.model.support.Sender;

public interface SenderDbService {
  
  List<SenderDb> findAll();

  public SenderDb findByPhone(String phone);
  
  public SenderDb createOrUpdate(Sender sender);
}
