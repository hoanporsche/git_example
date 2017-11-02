package ds.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

  @GetMapping("/admin/order")
  public String adminOrder(Model model, Authentication auth) {
    return "adminOrder";
  }

  @GetMapping("/admin/user")
  public String adminUser(Model model, Authentication auth) {
    return "adminUser";
  }

  @GetMapping("/admin/income")
  public String adminIncome(Model model, Authentication auth) {
    return "adminIncome";
  }
}
