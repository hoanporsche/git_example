package ds.upgrade.model.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import ds.upgrade.model.Category;
import ds.upgrade.model.Item;

public class CategoryJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  private String code;
  private String name;
  private String picture;
  private List<ItemJson> items;

  public CategoryJson(Category category) {
    setCode(category.getCode());
    setName(category.getName());
    this.setItems(category.getItems());
    setPicture(category.getPicture());
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public List<ItemJson> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = new ArrayList<>();
    for (Item item : items) {
      if (item.isEnabled())
        this.items.add(new ItemJson(item));
    }
  }
}
