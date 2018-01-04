package ds.service;

import ds.model.Category;

import java.util.List;

public interface CategoryService {

  List<Category> findAll();
  
  List<Category> findAllByStatus();
  
  void save(Category category);
  
  void hide(Category category);
  
  void show(Category category);
  
  Category findBycategoryCode(String categoryCode);
}
