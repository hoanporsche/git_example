package ds.service;

import ds.model.Item;

public interface ItemService {
  Iterable<Item> findAll();

  void save(Item item);

  void delete(int id);

  Item findOne(int id);
}
