package ds.serviceimpl;

import ds.model.Category;
import ds.repository.CategoryRepository;
import ds.service.CategoryService;
import ds.util.Constant;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;
  
  @Override
  public List<Category> findAll() {
    return (List<Category>) categoryRepository.findAll();
  }

  @Override
  public List<Category> findAllByStatus() {
    List<Category> listCategory = (List<Category>) categoryRepository.findAll();
    for (int i = 0; i < listCategory.size(); i++) {
      if (listCategory.get(i).isCategoryStatus() == false) {
        listCategory.remove(listCategory.get(i));
      }
    }
    return listCategory;
  }

  @Override
  public void save(Category category) {
    if (StringUtils.isEmpty(category.getCategoryCode())) {
      category.setCategoryCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
      category.setCategoryDateCreated(new Date());
    } else {
      Category c = categoryRepository.findBycategoryCode(category.getCategoryCode());
      category.setCategoryCode(c.getCategoryCode());
      category.setCategoryId(c.getCategoryId());
      category.setCategoryDateCreated(c.getCategoryDateCreated());
    }
    category.setCategoryDateUpdated(new Date());
    category.setCategoryStatus(true);
    categoryRepository.save(category);
  }

  @Override
  public void hide(Category category) {
    category.setCategoryStatus(false);
    category.setCategoryDateUpdated(new Date());
    categoryRepository.save(category);
  }

  @Override
  public void show(Category category) {
    category.setCategoryStatus(true);
    category.setCategoryDateUpdated(new Date());
    categoryRepository.save(category);
  }

  @Override
  public Category findBycategoryCode(String categoryCode) {
    return categoryRepository.findBycategoryCode(categoryCode);
  }

}
