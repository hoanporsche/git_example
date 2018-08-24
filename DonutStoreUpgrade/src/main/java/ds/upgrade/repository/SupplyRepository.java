package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.Supply;
import ds.upgrade.util.QueryConstant;

public interface SupplyRepository extends JpaRepository<Supply, Long>, JpaSpecificationExecutor<Supply> {

  @Query(QueryConstant.SUPPLY.FIND_ALL)
  List<Supply> findAll();
  
  Supply findByName(String name);
}
