package ds.service;

import ds.form.StoreForm;
import ds.model.Store;

import java.util.List;

public interface StoreService {

  List<Store> findAll();
  
  Store findBystoreCode(String storeCode);
  
  void save(StoreForm storeForm);
}
