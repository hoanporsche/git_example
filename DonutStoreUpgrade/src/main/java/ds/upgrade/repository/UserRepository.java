package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.User;
import ds.upgrade.util.Constants;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
  
  User findByEmail(String email);
  
  @Query("SELECT u FROM User u WHERE u.email = :email AND u.enabled = true")
  User findByEnabledEmail(@Param(Constants.PARAM.EMAIL_PARAM) String email);
  
  @Query("SELECt u FROM User u WHERE u.enabled = true")
  List<User> findAll();

}
