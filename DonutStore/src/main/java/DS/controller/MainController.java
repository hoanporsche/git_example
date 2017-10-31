package DS.controller;

import DS.model.Order;
import DS.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;




@Controller
public class MainController {
  
  @Autowired
  private UserService userService;

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
    model.addAttribute("order", new Order());
    return "order";
  }

  @GetMapping("/admin")
  public String admin() {
    return "admin";
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