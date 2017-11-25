package ds.controller;

import ds.form.OrderForm;
import ds.model.Order;
import ds.service.OrderService;
import ds.service.UserService;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainController {

  @Autowired
  private UserService userService;
  
  @Autowired
  private OrderService orderService;

  /**
   * @author HoanVD - 31/10/2017.
   * @param model.
   * @param auth.
   * @param redirect.
   * @param session.
   * @return.
   */
  @GetMapping("/")
  public String home(Model model, Authentication auth, RedirectAttributes redirect,
      HttpSession session) {
    auth = SecurityContextHolder.getContext().getAuthentication();
    boolean userRole0 = auth.getAuthorities().stream()
        .anyMatch(r -> r.getAuthority().equals("ROLE_MEMBER"));
    if (userRole0) {
      session.setAttribute("loginedUser", "User has been logined");
      session.setAttribute("user", userService.findByuserName(auth.getName()));
    }
    boolean userRole1 = auth.getAuthorities().stream()
        .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
    if (userRole1) {
      session.setAttribute("loginedAdmin", "Admin has been logined");
    }
    return "home";
  }

  @GetMapping("/order")
  public String order(Model model) {
    model.addAttribute("orderForm", new OrderForm());
    return "order";
  }
  
  @PostMapping("/createOrder")
  public String createOrder(@Valid OrderForm orderForm,BindingResult bindingResult,HttpServletRequest request) {
    if (bindingResult.hasErrors()) {
      return "order";
    }
    String brMan = request.getParameter("brMan");
    System.out.println(brMan);
//    Date date = order.getOrderDateDone();
//    System.out.println(date.toString());
    return "redirect:/";
  }

  @GetMapping("/admin")
  public String admin(@RequestParam(value="page", defaultValue="1") int page ,
      @RequestParam(value="size", defaultValue = "10") int size,Model model) {
    long totalOrder = orderService.countAll();
    
    long pageStart = 0, pageLast = 0,totalPage = 0;
    if(totalOrder % size == 0){
      totalPage =  totalOrder / size;
    }else {
      totalPage = (totalOrder / size) + 1;
    }
    pageStart = size * (page - 1);
    if(page == totalPage){
      pageLast = totalOrder ;
    }else{
      pageLast = page * size;
    }
    
    model.addAttribute("today", new Date());
    model.addAttribute("pageStart", pageStart);
    model.addAttribute("pageLast", pageLast);
    model.addAttribute("totalOrder", totalOrder);
    model.addAttribute("totalPage", totalPage);
    model.addAttribute("orders", "123");
    return "adminOrder";
  }

  @GetMapping("/403")
  public String accessDenied() {
    return "403";
  }

  @GetMapping("/login")
  public String getLogin(Model model, Authentication auth) {
    return "login";
  }

  /**
   * @author HoanVD - 31/10/2017.
   * @param request.
   * @param response.
   * @param session.
   * @return.
   */
  @GetMapping("/logout")
  public String logout(HttpServletRequest request, HttpServletResponse response,
      HttpSession session) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      new SecurityContextLogoutHandler().logout(request, response, auth);
    }
    return "redirect:/";
  }

}