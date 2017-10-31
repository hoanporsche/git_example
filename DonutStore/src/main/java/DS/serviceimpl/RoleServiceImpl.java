package DS.serviceimpl;

import DS.model.Role;
import DS.repository.RoleRepository;
import DS.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
  @Autowired
  private RoleRepository roleRepository;
  
  @Override
  public Iterable<Role> findAll() {
    return roleRepository.findAll();
  }

  @Override
  public void save(Role role) {
    roleRepository.save(role);
  }

  @Override
  public void delete(int id) {
    roleRepository.delete(id);
  }

  @Override
  public Role findOne(int id) {
    return roleRepository.findOne(id);
  }

}
