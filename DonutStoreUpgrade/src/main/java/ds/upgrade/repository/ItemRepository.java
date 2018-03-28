package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Item;
import ds.upgrade.util.Constants;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

  @Query("SELECT i FROM Item i WHERE i.enabled = true")
  List<Item> findAll();
  
  Item findByName(String name);
  
  @Query("SELECT i FROM Item i WHERE i.categoryId.id = :id")
  List<Item> findByCategory(@Param(Constants.PARAM.ID_PARAM) Long id);
}
