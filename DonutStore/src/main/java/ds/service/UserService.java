package ds.service;

import ds.form.UserForm;
import ds.model.User;

import java.util.List;

public interface UserService {
  Iterable<User> findAll();

  User findByuserEmail(String userEmail);
  
  String resetPassword(String userEmail);
  
  User getUserFromList(List<User> listUser, String userEmail);
  
  void createUser(UserForm userForm);
}
