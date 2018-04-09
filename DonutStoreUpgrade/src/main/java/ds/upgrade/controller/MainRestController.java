package ds.upgrade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Category;
import ds.upgrade.model.Item;
import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ItemService;
import ds.upgrade.util.Constants;

@RestController
public class MainRestController {
  
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ItemService itemService;
  
  @GetMapping(Constants.MODEL.CATEGORY_MODEL + Constants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllCategory() {
    try {
      List<Category> list = categoryService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Category>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  @GetMapping(Constants.MODEL.ITEM_MODEL + Constants.API_URL.FIND_ALL)
  public ResponseEntity<?> findAllItem() {
    try {
      List<Item> list = itemService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Item>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

}