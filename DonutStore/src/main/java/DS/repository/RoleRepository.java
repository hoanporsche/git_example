package DS.repository;

import org.springframework.data.repository.CrudRepository;

import DS.model.Role;

public interface RoleRepository extends CrudRepository<Role, Integer> {

    Role findByroleName(String roleName);

}