package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Role;

public interface RoleService {

  List<Role> findAll();

  Role findOne(Long id);
  
  Page<Role> findList(Pageable pageable, Boolean enabled);
  
  Role save(Role role);
  
  Role enabledOrNot(Long id);
  
  Role findByName(String name);
}
