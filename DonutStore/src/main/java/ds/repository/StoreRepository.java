package ds.repository;

import ds.model.Store;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Integer> {
  public Store findBystoreName(String storeName);
  
  public Store findBystoreCode(String storeCode);
}
