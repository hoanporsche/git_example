package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.Store;

public interface StoreRepository extends JpaRepository<Store, Long>, JpaSpecificationExecutor<Store> {
  Store findByname(String name);
  
  @Query("SELECT s FROM Store s WHERE s.enabled = true")
  List<Store> findAll();
  
  Store findBycode(String code);
}
