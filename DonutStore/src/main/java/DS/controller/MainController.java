package DS.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainController {

    @GetMapping("/")
    public String home(Model model,Authentication auth, RedirectAttributes redirect) {
    	auth = SecurityContextHolder.getContext().getAuthentication();
		boolean userRole0 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_MEMBER"));
		if(userRole0) {
			model.addAttribute("logined", "You have been logined");
		}
		boolean userRole1 = auth.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
		if(userRole1) {
			model.addAttribute("loginedAdmin", "You have been logined as ADMIN");
		}
        return "home";
    }
    
    @GetMapping("/checkLogined")
    public String checkLogined() {
    	
    	return "redirect:/";
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
    public String getLogin() {
        return "login";
    }
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/";
    }

}