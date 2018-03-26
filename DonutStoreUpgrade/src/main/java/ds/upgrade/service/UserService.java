package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.User;

public interface UserService {

  List<User> findAll();

  User findOne(Long id);
  void delete(Long id);
  void save(User user);
}
