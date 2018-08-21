package ds.upgrade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import ds.upgrade.model.Order;
import ds.upgrade.model.support.CategoryJson;
import ds.upgrade.model.support.ItemJson;
import ds.upgrade.model.support.OrderJson;
import ds.upgrade.model.support.StoreJson;
import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ItemService;
import ds.upgrade.service.OrderService;
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
  @Autowired
  private OrderService orderService;
  @Autowired
  private RestTemplate restTemplate;
  
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
      List<StoreJson> list = storeService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<StoreJson>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
  
  @PostMapping(AppConstant.MODEL.ORDER_MODEL + AppConstant.API_URL.CREATE)
  public ResponseEntity<?> createNewOrder(@RequestBody OrderJson orderJson, BindingResult result) {
    try {
        Thread.sleep(3000);
        if (result.hasErrors()) 
          return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
        Order order = orderService.create(orderJson);
        return new ResponseEntity<OrderJson>(orderJson, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
//    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
