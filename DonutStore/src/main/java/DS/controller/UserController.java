package DS.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
	
	@GetMapping("/user")
	public String user() {
		return "user";
	}
	@GetMapping("/user/registry")
	public String userRegistry(){
		
		return "userRegistry";
	}
}
