package ds.upgrade.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ds.upgrade.model.Item;
import ds.upgrade.model.json.ItemJson;
import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.service.ItemService;
import ds.upgrade.util.service.CommonMethod;

@Controller
public class MenuController {
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ItemService itemService;
  @Autowired
  private CommonMethod commonMethod;
  @Autowired
  private ConfigGlobalService configGlobalService;

  @GetMapping("/thuc-don")
  public String menuPage(Model model) {
    model.addAttribute("categories", categoryService.findAllJson());
    commonMethod.findHeaderInfo("Thực đơn - Bánh rán Hoàn", model);
    String redirectUrl = "redirect:/thuc-don/" + itemService.findFirstEnabledItem().getUrl();
    return redirectUrl;
  }
  
  @GetMapping("/thuc-don/{itemUrl}")
  public String menuSingleItemPage(Model model, HttpSession session, @PathVariable String itemUrl) {
    Item foundItem = itemService.findByUrl(itemUrl);
    if (foundItem == null) return "redirect:/404";
    commonMethod.findHeaderInfo("Thực đơn - Bánh rán Hoàn", model);
    model.addAttribute("foundItem", new ItemJson(foundItem));
    model.addAttribute("categories", categoryService.findAllJson());
    return "public/menu";
  }
}
