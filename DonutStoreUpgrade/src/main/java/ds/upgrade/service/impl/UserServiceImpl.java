package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ds.upgrade.model.User;
import ds.upgrade.repository.UserRepository;
import ds.upgrade.repository.specification.UserSpecification;
import ds.upgrade.service.UserService;

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
  public User changePassword(String email, String newPassword) {
    User user = userRepository.findByEmail(email);
    if (user == null)
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
}
