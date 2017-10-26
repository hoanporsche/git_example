package DS.repository;

import org.springframework.data.repository.CrudRepository;

import DS.model.Item;

public interface ItemRepository extends CrudRepository<Item,Integer> {

}
