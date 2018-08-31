package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Staff;
import ds.upgrade.model.Store;
import ds.upgrade.model.json.StoreJson;
import ds.upgrade.repository.StaffRepository;
import ds.upgrade.repository.StoreRepository;
import ds.upgrade.repository.specification.StoreSpecification;
import ds.upgrade.service.StoreService;
import ds.upgrade.util.service.CommonMethod;

@Service
public class StoreServiceImpl implements StoreService {

  @Autowired
  private StoreRepository storeRepository;
  @Autowired
  private CommonMethod commonMethod;
  @Autowired
  private StaffRepository staffRepository;
  
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<StoreJson> findAllJson() {
    List<StoreJson> list = new ArrayList<StoreJson>();
    storeRepository.findAll().forEach(store -> list.add(new StoreJson(store)));
    return list;
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

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param pageable
   * @param enabled
   * @return
   */
  @Override
  public Page<Store> findList(Pageable pageable, Boolean enabled) {
    Specification<Store> spec = new StoreSpecification(enabled);
    return storeRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param store
   * @return
   */
  @Override
  public Store save(Store store) {
    if (store.getId() == null) {
      store.setDateCreated(new Date());
      store.setCode(commonMethod.createStoreCode());
    } else {
      Store foundStore = storeRepository.findOne(store.getId());
      if (foundStore == null)
        return null;
      store.setDateCreated(foundStore.getDateCreated());
      store.setCode(foundStore.getCode());
    }
    store.setDateUpdated(new Date());
    store.setEnabled(true);
    return storeRepository.save(store);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param id
   * @return
   */
  @Override
  public Store enabledOrNot(Long id) {
    Date today = new Date();
     return Optional.ofNullable(storeRepository.findOne(id)).map(p -> {
       if (p.isEnabled()) {
         List<Staff> list = staffRepository.findByStore(id);
         list.forEach(i -> {
           i.setDateUpdated(today);
           i.setEnabled(Boolean.FALSE);
           staffRepository.save(i);
         });
       }
       p.setDateUpdated(today);
       p.setEnabled(!p.isEnabled());
       return storeRepository.save(p);
    }).orElseGet(()-> new Store());
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param name
   * @return
   */
  @Override
  public Store findByName(String name) {
    return storeRepository.findByname(name);
  }

  @Override
  public List<Store> findAll() {
    return storeRepository.findAll();
  }

}
