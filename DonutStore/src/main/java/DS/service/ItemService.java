package DS.service;

import DS.model.Item;

public interface ItemService {
	Iterable<Item> findAll();
	void save(Item item);
	void delete(int id);
	Item findOne(int id);
}
