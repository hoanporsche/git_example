package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Category;

public interface CategoryService {

  List<Category> findAll();
  
  Category findOne(Long id);
}
