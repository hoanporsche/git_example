package ds.upgrade.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuController {

	@GetMapping("/thuc-don")
	  public String menuPage(Model model) {
	    model.addAttribute("title","Thực đơn");
	    return "public/menu";
	  }
}
