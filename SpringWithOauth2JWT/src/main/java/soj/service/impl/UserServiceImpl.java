package soj.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soj.model.User;
import soj.repository.UserRepository;
import soj.service.UserService;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;
  
  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public User findOne(int id) {
    return userRepository.findOne(id);
  }

  @Override
  public void delete(int id) {
    userRepository.delete(id);
  }

  @Override
  public void save(User user) {
    userRepository.save(user);
  }

}
