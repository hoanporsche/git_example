package ds.service;

import ds.model.User;

public interface UserService {
  Iterable<User> findAll();

  void save(User user);

  void delete(int id);

  User findOne(int id);

  User findByuserName(String userName);
}
