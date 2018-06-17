package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.User;
import ds.upgrade.util.AppConstants;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
  
  User findByEmail(String email);
  
  @Query("SELECT u FROM User u WHERE u.email = :email AND u.enabled = true")
  User findByEnabledEmail(@Param(AppConstants.PARAM.EMAIL_PARAM) String email);
  
  @Query("SELECT u FROM User u WHERE u.storeId.phone = :phone AND u.enabled = true")
  User findByEnabledPhone(@Param(AppConstants.PARAM.PHONE_PARAM) String phone);
  
  @Query("SELECt u FROM User u WHERE u.enabled = true")
  List<User> findAll();

}
