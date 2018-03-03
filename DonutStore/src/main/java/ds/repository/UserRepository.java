package ds.repository;

import ds.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
  
  User findByuserEmail(String userEmail);

}
