package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Store;
import ds.upgrade.repository.StoreRepository;
import ds.upgrade.service.StoreService;

@Service
public class StoreServiceImpl implements StoreService {

  @Autowired
  private StoreRepository storeRepository;
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<Store> findAll() {
    return storeRepository.findAll();
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public Store findOne(Long id) {
    return storeRepository.findOne(id);
  }

}
