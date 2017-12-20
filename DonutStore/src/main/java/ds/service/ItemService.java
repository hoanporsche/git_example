package ds.service;

import ds.form.ItemForm;
import ds.model.Item;

import java.util.List;

public interface ItemService {
  List<Item> findAll();

  void saveItem(ItemForm itemForm);
  
  void hideItem(Item item);
  
  Item findOneFromList(List<Item> listItem, String itemCode);
}
