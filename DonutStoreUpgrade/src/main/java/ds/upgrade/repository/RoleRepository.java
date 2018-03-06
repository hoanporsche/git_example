package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>, JpaSpecificationExecutor<Role> {

  Role findByroleName(String roleName);
}