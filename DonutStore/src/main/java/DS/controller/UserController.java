package DS.controller;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import DS.model.User;

@Controller
public class UserController {
	
	@GetMapping("/user")
	public String user() {
		return "user";
	}
	@PostMapping("/create")
	public String userCreate(@Valid User user,BindingResult bindingResult){
	  if (bindingResult.hasErrors()) {
      return "registry";
  }
		return "redirect:/";
	}
	@GetMapping("/registry")
	public String userRegistry(Model model) {
	  model.addAttribute("user", new User());
	  return "registry";
	}
}
