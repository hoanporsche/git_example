package ds.serviceimpl;

import ds.model.Store;
import ds.repository.StoreRepository;
import ds.service.StoreService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService {
  
  @Autowired
  private StoreRepository storeRepository;

  @Override
  public List<Store> findAll() {
    List<Store> listStore = new ArrayList<>();
    List<Store> listStoreFound = (List<Store>) storeRepository.findAll();
    for (int i = 0; i < listStoreFound.size(); i++) {
      if (listStoreFound.get(i).isStoreStatus() == true) {
        listStore.add(listStoreFound.get(i));
      }
    }
    return listStore;
  }

}
