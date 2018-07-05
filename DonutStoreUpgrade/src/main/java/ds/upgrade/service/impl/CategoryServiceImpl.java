package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Category;
import ds.upgrade.model.Item;
import ds.upgrade.model.support.CategoryJson;
import ds.upgrade.repository.CategoryRepository;
import ds.upgrade.repository.ItemRepository;
import ds.upgrade.repository.specification.CategorySpecification;
import ds.upgrade.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private ItemRepository itemRepository;

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<CategoryJson> findAll() {
    List<Category> listFound = categoryRepository.findAll();
    List<CategoryJson> listJson = new ArrayList<>();
    if (listFound != null && listFound.size() > 0) {
      for (Category category : listFound) {
        listJson.add(new CategoryJson(category));
      }
      return listJson;
    }
    return null;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public Category findOne(Long id) {
    return categoryRepository.findOne(id);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 26, 2018
   * @modifier: hoan
   * @modifier_date: Mar 26, 2018
   * @param pageable
   * @return
   */
  @Override
  public Page<Category> findList(Pageable pageable, Boolean enabled) {
    Specification<Category> spec = new CategorySpecification(enabled);
    return categoryRepository.findAll(spec, pageable);
  }

  @Override
  public Category save(Category category) {
    if (category.getId() == null) {
      category.setDateCreated(new Date());
    } else {
      Category foundCategory = categoryRepository.findOne(category.getId());
      if (foundCategory == null)
        return null;
      category.setDateCreated(foundCategory.getDateCreated());
    }
    category.setDateUpdated(new Date());
    category.setEnabled(true);
    return categoryRepository.save(category);
  }

  @Override
  public Category enabledOrNot(Long id) {
    Category foundCategory = categoryRepository.findOne(id);
    if (foundCategory == null)
      return null;
    if (foundCategory.isEnabled()) {
      List<Item> list = itemRepository.findByCategory(id);
      for (Item item : list) {
        item.setEnabled(false);
        itemRepository.save(item);
      }
    }
    foundCategory.setDateUpdated(new Date());
    foundCategory.setEnabled(!foundCategory.isEnabled());
    return categoryRepository.save(foundCategory);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param name
   * @return
   */
  @Override
  public Category findByName(String name) {
    return categoryRepository.findByName(name);
  }

}
