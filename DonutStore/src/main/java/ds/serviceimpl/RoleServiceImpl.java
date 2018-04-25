package ds.serviceimpl;

import ds.model.Role;
import ds.repository.RoleRepository;
import ds.service.RoleService;
import ds.util.Constant;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
  @Autowired
  private RoleRepository roleRepository;

  @Override
  public List<Role> findAll() {
    return (List<Role>) roleRepository.findAll();
  }

  @Override
  public void save(Role role) {
    role.setRoleCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
    roleRepository.save(role);
  }

  @Override
  public Role findOne(int id) {
    return roleRepository.findOne(id);
  }

  @Override
  public Role findOneFromList(List<Role> listRole, String roleCode) {
    for (int i = 0; i < listRole.size(); i++) {
      if (roleCode.equals(listRole.get(i).getRoleCode())) {
        return listRole.get(i);
      }
    }
    return null;
  }

}
