package ds.upgrade.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OrderController {
	
	@GetMapping("/dat-mon")
	  public String orderPage(Model model) {
	    model.addAttribute("title","Đặt món - Bánh rán Vũ Hoàn");
	    return "public/order";
	  }
}
