package ds.repository;

import ds.model.Item;

import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {

  public Item findByitemCode(String itemCode);
}
