package ds.upgrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ItemService;
import ds.upgrade.util.service.CommonMethod;

@Controller
public class OrderController {
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ItemService itemService;
  @Autowired
  private CommonMethod commonMethod;
	@GetMapping("/dat-mon")
	  public String orderPage(Model model) {
	    model.addAttribute("categories", categoryService.findAllJson());
	    commonMethod.findHeaderInfo("Đặt món giao ngay - Bánh rán Hoàn", model);
	    return "public/order";
	  }
}
