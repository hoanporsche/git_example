package ds.upgrade.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.User;

public interface UserService {

  List<User> findAll();

  User findOne(Long id);
  
  User findByEmail(String email);
  
  Page<User> findList(Pageable pageble, Long storeId, Date startDate, Date endDate, Long roleId);
  
  User resetPassword(String email);
  
  User changePassword(String email, String newPassword);
  
  User save(User user);
  
  User enabledOrNot(Long id);
  
}
