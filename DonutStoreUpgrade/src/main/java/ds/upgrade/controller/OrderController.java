package ds.upgrade.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import ds.upgrade.model.form.CartCheckOut;
import ds.upgrade.model.json.CategoryJson;
import ds.upgrade.service.CategoryService;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.service.StoreService;
import ds.upgrade.util.service.CommonMethod;

@Controller
public class OrderController {
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private StoreService storeService;
  @Autowired
  private ConfigGlobalService configGlobalService;
  @Autowired
  private CommonMethod commonMethod;
  
	@GetMapping("/dat-mon")
	  public String orderPage(Model model) {
	    model.addAttribute("categories", categoryService.findAllJson());
	    commonMethod.findHeaderInfo("Đặt món giao ngay - Bánh rán Hoàn", model);
	    model.addAttribute("headerInfo", configGlobalService.findByname("headerInfo").getValue());
      model.addAttribute("minTotalPrice", configGlobalService.findByname("minTotalPrice").getValue());
	    return "public/order";
	  }
	
	@GetMapping("/thong-tin-giao-hang") 
	public String checkOut(Model model, HttpSession session) {
    commonMethod.findHeaderInfo("Thông tin giao hàng - Bánh rán Hoàn", model);
    model.addAttribute("listStore", storeService.findAllJson());
    model.addAttribute("cart", session.getAttribute("cartCheckOut"));
	  return "public/check-out";
	}
	
	@PostMapping("/cart-check-out")
	@ResponseBody
	public ResponseEntity<?> cartCheckOut(@RequestBody CartCheckOut cartCheckOut, HttpSession session) {
		session.setAttribute("cartCheckOut", cartCheckOut);
		return new ResponseEntity<CartCheckOut>(cartCheckOut, HttpStatus.OK);
	}
}
