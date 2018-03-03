package ds.repository;

import ds.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

  Role findByroleName(String roleName);

}