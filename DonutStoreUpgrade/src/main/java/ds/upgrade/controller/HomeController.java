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
  @Autowired
  private ConfigGlobalService configGlobalService;

  @GetMapping("/")
  public String webSocket(Model model) {
    model.addAttribute("categories",categoryService.findAllJson());
    commonMethod.findHeaderInfo("Bánh rán Hoàn - Bánh rán, bánh gà, gà xiên, heo xiên", model);
    model.addAttribute("slidePicture1", configGlobalService.findByname("slidePicture1").getValue());
    model.addAttribute("slidePicture2", configGlobalService.findByname("slidePicture2").getValue());
    model.addAttribute("slidePicture3", configGlobalService.findByname("slidePicture3").getValue());
    model.addAttribute("headerInfo", configGlobalService.findByname("headerInfo").getValue());
    model.addAttribute("shippingPrice", configGlobalService.findByname("shippingPrice").getValue());
    return "public/home";
  }
}
