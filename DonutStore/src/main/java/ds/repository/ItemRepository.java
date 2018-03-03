package ds.repository;

import ds.model.Item;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {

  public Item findByitemCode(String itemCode);
}
