package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Item;
import ds.upgrade.model.support.ItemJson;
import ds.upgrade.repository.ItemRepository;
import ds.upgrade.repository.specification.ItemSpecification;
import ds.upgrade.service.ItemService;
import ds.upgrade.util.AppConstant;

@Service
public class ItemServiceImpl implements ItemService {

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
  public List<ItemJson> findAll() {
    List<Item> listFound = itemRepository.findAll();
    List<ItemJson> list = new ArrayList<>();
    if (listFound != null && listFound.size() > 0) {
      for (Item item : listFound) {
        list.add(new ItemJson(item));
      }
      return list;
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
  public Item findOne(Long id) {
    return itemRepository.findOne(id);
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
  public Page<Item> findList(Pageable pageable, Boolean enabled, Long materialId, Long categoryId) {
    Specification<Item> spec = new ItemSpecification(enabled, materialId, categoryId);
    return itemRepository.findAll(spec, pageable);
  }

  @Override
  public Item save(Item item) {
    if (item.getId() == null) {
      item.setDateCreated(new Date());
      item.setCode(RandomStringUtils.random(10, AppConstant.FORMAT.RANDOM_STRING_BASIC));
    } else {
      Item foundItem = itemRepository.findOne(item.getId());
      if (foundItem == null)
        return null;
      item.setDateCreated(foundItem.getDateCreated());
      item.setCode(foundItem.getCode());
    }
    item.setDateUpdated(new Date());
    item.setEnabled(true);
    return itemRepository.save(item);
  }

  @Override
  public Item enabledOrNot(Long id) {
    Item foundItem = itemRepository.findOne(id);
    if (foundItem == null)
      return null;
    if (foundItem.isEnabled()) {
      foundItem.getMaterials().clear();
    } else if (!foundItem.getCategoryId().isEnabled()) {
        return null;
    }
    foundItem.setDateUpdated(new Date());
    foundItem.setEnabled(!foundItem.isEnabled());
    return itemRepository.save(foundItem);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: User
   * @modifier_date: Mar 28, 2018
   * @param name
   * @return
   */
  @Override
  public Item findByName(String name) {
    return itemRepository.findByName(name);
  }
}
