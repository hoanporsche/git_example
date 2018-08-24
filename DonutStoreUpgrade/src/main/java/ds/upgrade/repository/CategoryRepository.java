package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.Category;
import ds.upgrade.util.QueryConstant;

public interface CategoryRepository
    extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {

  @Query(QueryConstant.CATEGORY.FIND_ALL)
  List<Category> findAll();
  
  Category findByName(String name);
}
