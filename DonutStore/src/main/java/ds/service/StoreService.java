package ds.service;

import ds.form.StoreForm;
import ds.model.Store;

import java.util.List;

public interface StoreService {

  List<Store> findAllByStatus();
  
  Iterable<Store> findAll();
  
  Store findBystoreCode(String storeCode);
  
  void save(StoreForm storeForm);
  
  void hideStore(Store store);
  
  void showStore(Store store);
  
  Store findOneInList(List<Store> listStore, String storeCode);
}
