package ds.repository;

import ds.model.Store;

import org.springframework.data.repository.CrudRepository;

public interface StoreRepository extends CrudRepository<Store, Integer> {
  public Store findBystoreName(String storeName);
}
