package ds.upgrade.service;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Role;
import ds.upgrade.model.User;
import ds.upgrade.model.form.UserForm;
import ds.upgrade.model.json.UserJson;

public interface UserService {

  List<User> findAll();

  User findOne(Long id);
  
  User findByEmail(String email);
  
  Page<User> findList(Pageable pageble, Long storeId, Date startDate, Date endDate, Long roleId);
  
  User resetPassword(String email);
  
  User changePassword(String email, String oldPassword, String newPassword);
  
  User save(UserForm userForm);
  
  User enabledOrNot(Long id);
  
  User findInfoUser();
  
  UserJson findJsonInfoUser();
  Boolean isAdmin(Set<Role> roles);
  Boolean isStore(Set<Role> roles);
  Boolean isStaff(Set<Role> roles);
}
