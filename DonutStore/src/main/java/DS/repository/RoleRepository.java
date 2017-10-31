package DS.repository;

import DS.model.Role;

import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {

  Role findByroleName(String roleName);

}