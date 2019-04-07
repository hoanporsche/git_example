package ds.upgrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ConfigGlobalService;

@Controller
public class HomeController {
  
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ConfigGlobalService configGlobalService;

  @GetMapping("/")
  public String webSocket(Model model) {
    model.addAttribute("title","Banh ran Vu Hoan");
    model.addAttribute("categories",categoryService.findAllJson());
    model.addAttribute("logo",configGlobalService.findByname("logo"));
    return "public/home";
  }
}
