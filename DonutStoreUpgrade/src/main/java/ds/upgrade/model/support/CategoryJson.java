package ds.upgrade.model.support;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import ds.upgrade.model.Category;
import ds.upgrade.model.Item;

public class CategoryJson implements Serializable {
  
  private static final long serialVersionUID = 4197942078910386097L;

  private String name;
  private List<ItemJson> items;
  
  public CategoryJson(Category category) {
    setName(category.getName());
    this.setItems(category.getItems());
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<ItemJson> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = new ArrayList<>();
    for (Item item : items) {
      this.items.add(new ItemJson(item));
    }
  }
}
