package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Item;
import ds.upgrade.model.json.ItemJson;

public interface ItemService {

  List<ItemJson> findAll();
  
  Item findOne(Long id);
  
  Page<Item> findList(Pageable pageable, Boolean enabled, Long materialId, Long categoryId);
  
  Item save(Item item);
  
  Item enabledOrNot(Long id);

  Item findByName(String name);
  
  Item findByUrl(String url);
  
  ItemJson findFirstEnabledItem();
}
