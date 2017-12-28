package ds.serviceimpl;

import ds.form.UserForm;
import ds.model.User;
import ds.repository.UserRepository;
import ds.service.UserService;
import ds.util.AdminUserConstant.AdminUserMessage;
import ds.util.Constant;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;
  
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public User findByuserEmail(String userEmail) {
    return userRepository.findByuserEmail(userEmail);
  }

  @Override
  public String resetPassword(String userEmail) {
    User u = userRepository.findByuserEmail(userEmail);
    if (u == null) {
      return AdminUserMessage.NOT_FOUND_ACCOUNT;
    }
    String newPassword = RandomStringUtils.random(6, Constant.RANDOM_STRING_BASIC);
    u.setUserPassword(passwordEncoder.encode(newPassword));
    userRepository.save(u);
    return newPassword;
  }

  @Override
  public User getUserFromList(List<User> listUser, String userEmail) {
    for (int i = 0; i < listUser.size(); i++) {
      if (userEmail.equals(listUser.get(i).getUserEmail())) {
        return listUser.get(i);
      }
    }
    return null;
  }

  @Override
  public void createUser(UserForm userForm) {
    User user = new User();
    if (StringUtils.isEmpty(userForm.getUserEmail())) {
      user.setUserDateCreated(new Date());
    } else {
      user = userRepository.findByuserEmail(userForm.getUserEmail());
      user.setRoles(userForm.getRoles());
      user.setUserDateUpdated(new Date());
      user.setUserStore(userForm.getStore());
    }
    userRepository.save(user);
  }
}
