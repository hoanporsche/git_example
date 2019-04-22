package ds.upgrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.service.StoreService;
import ds.upgrade.util.service.CommonMethod;

@Controller
public class ContactController {
  @Autowired
  private StoreService storeService;
  @Autowired
  private CommonMethod commonMethod;
  @Autowired
  private ConfigGlobalService configGlobalService;
	@GetMapping("/lien-he")
	  public String contactPage(Model model) {
	    commonMethod.findHeaderInfo("Liên hệ - Bánh rán Hoàn", model);
	    model.addAttribute("stores", storeService.findAllJson());
	    model.addAttribute("minTotalPrice", configGlobalService.findByname("minTotalPrice").getValue());
      model.addAttribute("freeShipDistance", configGlobalService.findByname("freeShipDistance").getValue());
	    return "public/contact";
	  }
}
