package ds.service;

import ds.form.ItemForm;
import ds.model.Item;

import java.util.List;

public interface ItemService {
  Iterable<Item> findAll();
  
  List<Item> findAllByStatus();
  
  Item findByitemCode(String itemCode);

  void saveItem(ItemForm itemForm);
  
  void hideItem(Item item);
  
  void showItem(Item item);
  
  Item findOneFromList(List<Item> listItem, String itemCode);
}
