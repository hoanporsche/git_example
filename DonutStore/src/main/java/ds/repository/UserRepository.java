package ds.repository;

import ds.model.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
  
  User findByuserEmail(String userEmail);

}
