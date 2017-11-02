package ds.serviceimpl;

import ds.model.User;
import ds.repository.UserRepository;
import ds.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public void save(User user) {
    userRepository.save(user);
  }

  @Override
  public void delete(int id) {
    userRepository.delete(id);
  }

  @Override
  public User findOne(int id) {
    return userRepository.findOne(id);
  }

  @Override
  public User findByuserName(String userName) {
    return userRepository.findByuserName(userName);
  }

}
