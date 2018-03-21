package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Store;

public interface StoreService {

  List<Store> findAll();

  Store findOne(Long id);
}
