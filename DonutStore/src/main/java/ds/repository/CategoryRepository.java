package ds.repository;

import ds.model.Category;

import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {

  public Category findBycategoryCode(String categoryCode);
}
