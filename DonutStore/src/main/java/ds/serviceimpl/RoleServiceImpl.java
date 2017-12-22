package ds.serviceimpl;

import ds.model.Role;
import ds.repository.RoleRepository;
import ds.service.RoleService;
import ds.util.Constant;

import org.apache.commons.lang3.RandomStringUtils;
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
    role.setRoleCode(RandomStringUtils.random(10, Constant.RANDOM_STRING));
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
