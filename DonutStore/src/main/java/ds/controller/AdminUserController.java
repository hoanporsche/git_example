package ds.controller;

import ds.model.Role;
import ds.service.RoleService;
import ds.service.StaffService;
import ds.service.StoreService;
import ds.service.UserService;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
public class AdminUserController {

  @Autowired
  private UserService userService;
  @Autowired
  private StaffService staffService;
  @Autowired
  private RoleService roleSerivce;
  @Autowired
  private StoreService storeService;
  
  @GetMapping("/user")
  public String adminUser(Model model, Authentication auth) {
    model.addAttribute("roles", roleSerivce.findAll());
    model.addAttribute("users", userService.findAll());
    model.addAttribute("staffs", staffService.findAll());
    model.addAttribute("stores", storeService.findAll());
    model.addAttribute("role", new Role());
    return "admin/user";
  }
  
  @PostMapping("/createRole")
  public String createRole(@Valid @ModelAttribute("role") Role role, BindingResult bindingResult,
      RedirectAttributes redirect) {
    if (bindingResult.hasErrors()) {
      return "admin/user";
    }
    if (!"ROLE_".equals(role.getRoleName().substring(0, 5))) {
      redirect.addFlashAttribute("WrongSyntax", "'ROLE_' phải ở đầu");
      return "redirect:/admin/user";
    }
    roleSerivce.save(role);
    return "redirect:/admin/user";
  }
}
