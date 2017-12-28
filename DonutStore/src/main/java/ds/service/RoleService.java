package ds.service;

import ds.model.Role;

import java.util.List;

public interface RoleService {
  List<Role> findAll();

  void save(Role role);

  Role findOne(int id);
  
  Role findOneFromList(List<Role> listRole, String roleCode);
}
