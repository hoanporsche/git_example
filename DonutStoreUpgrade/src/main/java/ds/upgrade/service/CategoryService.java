package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Category;

public interface CategoryService {

  List<Category> findAll();
  
  Category findOne(Long id);
  
  Page<Category> findList(Pageable pageable, Boolean enabled);
  
  Category save(Category category);
  
  Category enabledOrNot(Long id);
}
