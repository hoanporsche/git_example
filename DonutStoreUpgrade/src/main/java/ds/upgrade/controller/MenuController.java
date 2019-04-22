package ds.upgrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.service.CommonMethod;

@Controller
public class MenuController {
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private CommonMethod commonMethod;
  @Autowired
  private ConfigGlobalService configGlobalService;

  @GetMapping("/thuc-don")
  public String menuPage(Model model) {
    model.addAttribute("categories", categoryService.findAllJson());
    commonMethod.findHeaderInfo("Thực đơn - Bánh rán Hoàn", model);
    return "public/menu";
  }
}
