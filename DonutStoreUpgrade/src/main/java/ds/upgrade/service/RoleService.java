package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Role;

public interface RoleService {

  List<Role> findAll();

  Role findOne(Long id);
}
