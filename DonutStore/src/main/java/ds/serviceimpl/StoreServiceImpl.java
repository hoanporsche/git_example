package ds.serviceimpl;

import ds.form.StoreForm;
import ds.model.Store;
import ds.repository.StoreRepository;
import ds.service.StoreService;
import ds.util.Constant;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService {
  
  @Autowired
  private StoreRepository storeRepository;

  @Override
  public List<Store> findAllByStatus() {
    List<Store> listStoreFound = (List<Store>) storeRepository.findAll();
    for (int i = 0; i < listStoreFound.size(); i++) {
      if (listStoreFound.get(i).isStoreStatus() == false) {
        listStoreFound.remove(listStoreFound.get(i));
      }
    }
    return listStoreFound;
  }
  
  @Override
  public Iterable<Store> findAll() {
    return storeRepository.findAll();
  }

  @Override
  public Store findBystoreCode(String storeCode) {
    return storeRepository.findBystoreCode(storeCode);
  }

  @Override
  public void save(StoreForm storeForm) {
    Store store = new Store(new Date());
    if (storeForm.getStoreCode() == null) {
      store.setStoreCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
      store.setStoreDateCreated(new Date());
    } else {
      Store oldStore = storeRepository.findBystoreCode(storeForm.getStoreCode());
      store.setStoreId(oldStore.getStoreId());
      store.setStoreCode(storeForm.getStoreCode());
      store.setStoreDateCreated(oldStore.getStoreDateCreated());
    }
    store.setStoreName(storeForm.getStoreName());
    store.setStorePhoneNumber(storeForm.getStorePhoneNumber());
    store.setStoreAddress(storeForm.getStoreAddress());
    store.setStoreStatus(true);
    
    storeRepository.save(store);
  }

  @Override
  public void hideStore(Store store) {
    store.setStoreStatus(false);
    store.setStoreDateUpdated(new Date());
    storeRepository.save(store);
  }

  @Override
  public void showStore(Store store) {
    store.setStoreStatus(true);
    store.setStoreDateUpdated(new Date());
    storeRepository.save(store);
  }

}
