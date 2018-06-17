package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Role;
import ds.upgrade.model.User;
import ds.upgrade.repository.UserRepository;
import ds.upgrade.repository.specification.UserSpecification;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstants;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public User findOne(Long id) {
    return userRepository.findOne(id);
  }

  @Override
  public User findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Override
  public Page<User> findList(Pageable pageble, Long storeId, Date startDate, Date endDate, Long roleId) {
    Specification<User> spec = new UserSpecification(storeId, startDate, endDate, roleId);
    return userRepository.findAll(spec, pageble);
  }

  @Override
  public User resetPassword(String email) {
    User user = userRepository.findByEmail(email);
    if (user == null)
      return null;
    user.setPassword(passwordEncoder.encode("123456"));
    user.setDateUpdated(new Date());
    return userRepository.save(user);
  }

  @Override
  public User changePassword(String email, String oldPassword, String newPassword) {
    User user = userRepository.findByEnabledEmail(email);
    if (user == null || !passwordEncoder.matches(oldPassword, user.getPassword()))
      return null;
    user.setPassword(passwordEncoder.encode(newPassword));
    user.setDateUpdated(new Date());
    return userRepository.save(user);
  }

  @Override
  public User save(User user) {
    if (user.getId() == null) {
      user.setDateCreated(new Date());
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    } else {
      User foundUser = userRepository.findByEmail(user.getEmail());
      if (foundUser == null)
        return null;
      user.setDateCreated(foundUser.getDateCreated());
      user.setPassword(foundUser.getPassword());
    }
    user.setDateUpdated(new Date());
    user.setEnabled(true);
    user.setCredentialsexpired(false);
    user.setExpired(false);
    user.setLocked(false);
    return userRepository.save(user);
  }

  @Override
  public User enabledOrNot(Long id) {
    User foundUser = userRepository.findOne(id);
    if (foundUser == null)
      return null;
    foundUser.setDateUpdated(new Date());
    foundUser.setEnabled(!foundUser.isEnabled());;
    return userRepository.save(foundUser);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 1, 2018
   * @modifier: hoan
   * @modifier_date: Apr 1, 2018
   * @return
   */
  @Override
  public User findInfoUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null) 
      return null;
    User user = userRepository.findByEnabledEmail(authentication.getName());
    if (user == null)
      return null;
    return user;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 1, 2018
   * @modifier: hoan
   * @modifier_date: Apr 1, 2018
   * @return
   */
  @Override
  public Boolean isAdmin(Set<Role> roles) {
    for (Role role : roles) {
      if (AppConstants.ROLE.ROLE_ADMIN.equals(role.getName()))
        return true;
    }
    return false;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 1, 2018
   * @modifier: hoan
   * @modifier_date: Apr 1, 2018
   * @return
   */
  @Override
  public Boolean isStore(Set<Role> roles) {
    for (Role role : roles) {
      if (AppConstants.ROLE.ROLE_STORE.equals(role.getName()))
        return true;
    }
    return false;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 1, 2018
   * @modifier: hoan
   * @modifier_date: Apr 1, 2018
   * @return
   */
  @Override
  public Boolean isStaff(Set<Role> roles) {
    for (Role role : roles) {
      if (AppConstants.ROLE.ROLE_STAFF.equals(role.getName()))
        return true;
    }
    return false;
  }
}
