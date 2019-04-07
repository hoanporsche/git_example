package ds.upgrade.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactController {
	@GetMapping("/lien-he")
	  public String contactPage(Model model) {
	    model.addAttribute("title","Liên hệ - Bánh rán Vũ Hoàn");
	    return "public/contact";
	  }
}
