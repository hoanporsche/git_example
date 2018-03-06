package soj.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import soj.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

  Role findByName(String roleName);
}
