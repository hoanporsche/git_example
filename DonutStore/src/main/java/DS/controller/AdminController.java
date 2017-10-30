package DS.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

  @GetMapping("/admin/order")
  public String adminOrder(Model model,Authentication auth) {
    auth = SecurityContextHolder.getContext().getAuthentication();
    boolean userRole0 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_MEMBER"));
    if(userRole0) {
      model.addAttribute("logined", "You have been logined");
    }
    boolean userRole1 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
    if(userRole1) {
      model.addAttribute("loginedAdmin", "You have been logined as ADMIN");
    }
    return "adminOrder";
  }
  
  @GetMapping("/admin/user")
  public String adminUser(Model model,Authentication auth) {
    auth = SecurityContextHolder.getContext().getAuthentication();
    boolean userRole0 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_MEMBER"));
    if(userRole0) {
      model.addAttribute("logined", "You have been logined");
    }
    boolean userRole1 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
    if(userRole1) {
      model.addAttribute("loginedAdmin", "You have been logined as ADMIN");
    }
    return "adminUser";
  }
  
  @GetMapping("/admin/income")
  public String adminIncome(Model model,Authentication auth) {
    auth = SecurityContextHolder.getContext().getAuthentication();
    boolean userRole0 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_MEMBER"));
    if(userRole0) {
      model.addAttribute("logined", "You have been logined");
    }
    boolean userRole1 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
    if(userRole1) {
      model.addAttribute("loginedAdmin", "You have been logined as ADMIN");
    }
    return "adminIncome";
  }
}
