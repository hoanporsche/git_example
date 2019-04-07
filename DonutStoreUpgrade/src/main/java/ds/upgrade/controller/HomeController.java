package ds.upgrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.service.CategoryService;

@Controller
public class HomeController {
  
  @Autowired
  private CategoryService categoryService;

  @GetMapping("/")
  public String webSocket(Model model) {
    model.addAttribute("title","Banh ran Vu Hoan");
    model.addAttribute("categories",categoryService.findAllJson());
    return "public/home";
  }
}
