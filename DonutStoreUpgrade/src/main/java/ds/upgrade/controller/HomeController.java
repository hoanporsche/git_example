package ds.upgrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.service.CommonMethod;

@Controller
public class HomeController {
  
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private CommonMethod commonMethod;
//  @Autowired
//  private ConfigGlobalService configGlobalService;

  @GetMapping("/")
  public String webSocket(Model model) {
    model.addAttribute("categories",categoryService.findAllJson());
    commonMethod.findHeaderInfo("Bánh rán Hoàn - Bánh rán, bánh gà, gà xiên, heo xiên", model);
    return "public/home";
  }
}