package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Item;

public interface ItemService {

  List<Item> findAll();
  
  Item findOne(Long id);
}
