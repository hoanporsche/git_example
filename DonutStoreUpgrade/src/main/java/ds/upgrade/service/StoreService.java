package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Store;
import ds.upgrade.model.json.StoreJson;

public interface StoreService {

  List<StoreJson> findAllJson();

  Store findOne(Long id);
  
  Page<Store> findList(Pageable pageable, Boolean enabled);
  
  Store save(Store store);
  
  Store enabledOrNot(Long id);
  
  Store findByName(String name);
  
  List<Store> findAll();
}
