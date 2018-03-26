package ds.upgrade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.User;
import ds.upgrade.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;
  
  @RequestMapping(value = "/list-user", method = RequestMethod.GET)
  public List<User> listUser(){
    return userService.findAll();
  }
  
  @PostMapping("/save")
  public String save(@RequestBody User user) {
    userService.save(user);
    return "save successful";
  }
  
  @DeleteMapping("/user/{id}")
  public String delete(@PathVariable(value = "id") Long id) {
    userService.delete(id);
    return "success";
  }
}
