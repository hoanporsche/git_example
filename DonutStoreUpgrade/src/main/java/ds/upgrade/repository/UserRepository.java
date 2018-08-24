package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.User;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
  
  User findByEmail(String email);
  
  @Query(QueryConstant.USER.FIND_BY_ENABLED_EMAIL)
  User findByEnabledEmail(@Param(AppConstant.PARAM.EMAIL_PARAM) String email);
  
  @Query(QueryConstant.USER.FIND_BY_ENABLED_PHONE)
  User findByEnabledPhone(@Param(AppConstant.PARAM.PHONE_PARAM) String phone);
  
  @Query(QueryConstant.USER.FIND_ALL)
  List<User> findAll();

}
