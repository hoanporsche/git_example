package ds.service;

import ds.model.Role;

public interface RoleService {
  Iterable<Role> findAll();

  void save(Role role);

  void delete(int id);

  Role findOne(int id);
}
