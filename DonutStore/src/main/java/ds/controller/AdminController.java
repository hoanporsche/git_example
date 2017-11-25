package ds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ds.service.ItemService;

@Controller
@RequestMapping("/admin")
public class AdminController {
  
  @Autowired
  private ItemService itemService;
  
  @GetMapping("/user")
  public String adminUser(Model model, Authentication auth) {
    return "adminUser";
  }

  @GetMapping("/staff")
  public String adminStaff(Model model, Authentication auth) {
    return "adminStaff";
  }

  @GetMapping("/income")
  public String adminIncome(Model model, Authentication auth) {
    return "adminIncome";
  }
  
  @GetMapping("/item")
  public String adminItem(Model model, Authentication auth) {
    return "adminItem";
  }
  
  @GetMapping("/material")
  public String adminMaterial(Model model, Authentication auth) {
    return "adminMaterial";
  }
  
  @GetMapping("/timekeeping")
  public String adminTimekeeping(Model model, Authentication auth) {
    return "adminTimekeeping";
  }
}
