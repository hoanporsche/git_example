package ds.controller;

import ds.model.User;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

  @GetMapping("/")
  public String user() {
    return "user";
  }

  /** .
   * @author HoanVD - 31/10/2017.
   * @param user .
   * @param bindingResult .
   * @return.
   */
  @PostMapping("/create")
  public String userCreate(@Valid User user, BindingResult bindingResult) {
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
