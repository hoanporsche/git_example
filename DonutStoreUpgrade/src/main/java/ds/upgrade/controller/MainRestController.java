package ds.upgrade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Category;
import ds.upgrade.model.Item;
import ds.upgrade.model.Store;
import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ItemService;
import ds.upgrade.service.StoreService;
import ds.upgrade.util.AppConstants;

@RestController
public class MainRestController {
  
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ItemService itemService;
  @Autowired
  private StoreService storeService;
  
  @GetMapping(AppConstants.MODEL.CATEGORY_MODEL + AppConstants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllCategory() {
    try {
      List<Category> list = categoryService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Category>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  @GetMapping(AppConstants.MODEL.ITEM_MODEL + AppConstants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllItem() {
    try {
      List<Item> list = itemService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Item>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  @GetMapping(AppConstants.MODEL.STORE_MODEL + AppConstants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllStore() {
    try {
      List<Store> list = storeService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Store>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
