package ds.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ds.form.ItemForm;
import ds.form.MaterialForm;
import ds.service.ItemService;
import ds.service.MaterialService;

@Controller
@RequestMapping("/admin")
public class AdminController {
  
  @Autowired
  private ItemService itemService;
  
  @Autowired
  private MaterialService materialService;
  
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
  
  @GetMapping("/item-material")
  public String adminItemMaterial(Model model, Authentication auth) {
    model.addAttribute("materials", materialService.findAll());
    model.addAttribute("items", itemService.findAll());
    model.addAttribute("materialForm", new MaterialForm());
    model.addAttribute("itemForm", new ItemForm());
    return "adminItemMaterial";
  }
  
  @PostMapping("/createItem")
  public String createItem(@Valid @ModelAttribute("itemForm") ItemForm itemForm,
      BindingResult bindingResult,HttpServletRequest request) {
    if (bindingResult.hasErrors()) {
      return "adminItemMaterial";
    }
    return "adminItemMaterial";
  }
  
  @PostMapping("/createMaterial")
  public String createMaterial(@Valid @ModelAttribute("materialForm") MaterialForm materialForm,
      BindingResult bindingResult,HttpServletRequest request) {
    if (bindingResult.hasErrors()) {
      return "adminItemMaterial";
    }
    int id = materialForm.getMaterialId();
    System.out.println(id);
    materialService.createMaterial(materialForm);
    return "redirect:/admin/item-material";
  }
  
  @GetMapping("/deleteItem")
  public String deleteItem(@PathVariable int id) {
    System.out.println(id);
    return "redirect:/item-material";
  }
  
  @GetMapping("/deleteMaterial")
  public String deleteMaterial(@PathVariable int id) {
    System.out.println(id);
    return "redirect:/item-material";
  }
  
  @GetMapping("/timekeeping")
  public String adminTimekeeping(Model model, Authentication auth) {
    return "adminTimekeeping";
  }
}
