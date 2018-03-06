package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Store;

public interface StoreRepository extends JpaRepository<Store, Long>, JpaSpecificationExecutor<Store> {
  Store findBystoreName(String storeName);
}
