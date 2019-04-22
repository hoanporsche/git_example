package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Item;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

  @Query(QueryConstant.ITEM.FIND_ALL)
  List<Item> findAll();
  
  Item findByName(String name);

  Item findByUrl(String url);
  
  @Query(QueryConstant.ITEM.FIND_BY_CATEGORY)
  List<Item> findByCategory(@Param(AppConstant.PARAM.ID_PARAM) Long id);
  
  Item findBycode(String code);
}
