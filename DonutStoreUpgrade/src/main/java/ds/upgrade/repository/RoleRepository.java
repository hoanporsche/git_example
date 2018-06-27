package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.Role;
import ds.upgrade.util.QueryConstant;

public interface RoleRepository extends JpaRepository<Role, Long>, JpaSpecificationExecutor<Role> {

  Role findByName(String name);
  
  @Query(QueryConstant.ROLE.FIND_ALL)
  List<Role> findAll();
}