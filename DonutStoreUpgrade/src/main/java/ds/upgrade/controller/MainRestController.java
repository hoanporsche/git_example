package ds.upgrade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Store;
import ds.upgrade.model.support.CategoryJson;
import ds.upgrade.model.support.ItemJson;
import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ItemService;
import ds.upgrade.service.StoreService;
import ds.upgrade.util.AppConstant;

@RestController
public class MainRestController {
  
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ItemService itemService;
  @Autowired
  private StoreService storeService;
  
  @GetMapping(AppConstant.MODEL.CATEGORY_MODEL + AppConstant.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllCategory() {
    try {
      List<CategoryJson> list = categoryService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<CategoryJson>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  @GetMapping(AppConstant.MODEL.ITEM_MODEL + AppConstant.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllItem() {
    try {
      List<ItemJson> list = itemService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<ItemJson>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  @GetMapping(AppConstant.MODEL.STORE_MODEL + AppConstant.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllStore() {
    try {
      List<Store> list = storeService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Store>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
