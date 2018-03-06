package soj.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import soj.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  User findByEmail(String email);
}
