package ds.serviceimpl;

import ds.model.Item;
import ds.repository.ItemRepository;
import ds.service.ItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {
  @Autowired
  private ItemRepository itemRepository;

  @Override
  public Iterable<Item> findAll() {
    return itemRepository.findAll();
  }

  @Override
  public void save(Item item) {
    itemRepository.save(item);

  }

  @Override
  public void delete(int id) {
    itemRepository.delete(id);

  }

  @Override
  public Item findOne(int id) {
    return itemRepository.findOne(id);
  }

}
