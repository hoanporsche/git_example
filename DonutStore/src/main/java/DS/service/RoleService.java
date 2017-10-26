package DS.service;

import DS.model.Role;

public interface RoleService {
	Iterable<Role> findAll();
	void save(Role role);
	void delete(int id);
	Role findOne(int id);
}
