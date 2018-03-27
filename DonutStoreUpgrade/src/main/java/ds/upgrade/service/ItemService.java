package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Item;

public interface ItemService {

  List<Item> findAll();
  
  Item findOne(Long id);
  
  Page<Item> findList(Pageable pageable, Boolean enabled);
  
  Item save(Item item);
  
  Item enabledOrNot(Long id);
}
