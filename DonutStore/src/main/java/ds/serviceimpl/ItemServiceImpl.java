package ds.serviceimpl;

import ds.form.ItemForm;
import ds.model.Item;
import ds.repository.CategoryRepository;
import ds.repository.ItemRepository;
import ds.service.ItemService;
import ds.util.Constant;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {
  @Autowired
  private ItemRepository itemRepository;
  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public List<Item> findAllByStatus() {
    List<Item> listItemFound = (List<Item>) itemRepository.findAll();
    for (int i = 0; i < listItemFound.size(); i++) {
      if (listItemFound.get(i).isItemStatus() == false) {
        listItemFound.remove(listItemFound.get(i));
      }
    }
    return listItemFound;
  }

  @Override
  public void saveItem(ItemForm itemForm) {
    Item item = new Item();
    if (itemForm.getItemCode() == null) {
      item.setItemCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
      item.setItemDateCreated(new Date());
    } else {
      item.setItemId(itemForm.getItemId());
      item.setItemCode(itemForm.getItemCode());
      try {
        item.setItemDateCreated(new SimpleDateFormat(Constant.DATEFORMAT)
            .parse(itemForm.getItemDateCreated()));
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    item.setItemCategory(categoryRepository.findBycategoryCode(itemForm.getCategoryCode()));
    item.setItemName(itemForm.getItemName());
    item.setItemDateUpdated(new Date());
    item.setItemSingleValue(new BigDecimal(itemForm.getItemSingleValue()));
    item.setItemStatus(true);
    item.setMaterials(itemForm.getMaterials());
    itemRepository.save(item);
  }

  @Override
  public void hideItem(Item item) {
    item.setItemStatus(false);
    item.setItemDateUpdated(new Date());
    itemRepository.save(item);
  }

  @Override
  public Item findOneFromList(List<Item> listItem, String itemCode) {
    Item item = new Item();
    for (int i = 0; i < listItem.size(); i++) {
      if (itemCode.equals(listItem.get(i).getItemCode())) {
        item = listItem.get(i);
        return item;
      }
    }
    return null;
  }

  @Override
  public Iterable<Item> findAll() {
    return itemRepository.findAll();
  }

  @Override
  public Item findByitemCode(String itemCode) {
    return itemRepository.findByitemCode(itemCode);
  }

  @Override
  public void showItem(Item item) {
    item.setItemStatus(true);
    item.setItemDateUpdated(new Date());
    itemRepository.save(item);
  }

}
