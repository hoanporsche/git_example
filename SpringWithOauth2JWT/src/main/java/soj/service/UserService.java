package soj.service;

import java.util.List;

import soj.model.User;

public interface UserService {

  List<User> findAll();
  User findOne(int id);
  void delete(int id);
  void save(User user);
}
