package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Role;
import ds.upgrade.repository.RoleRepository;
import ds.upgrade.repository.specification.RoleSpecification;
import ds.upgrade.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

  @Autowired
  private RoleRepository roleRepository;
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<Role> findAll() {
    return roleRepository.findAll();
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public Role findOne(Long id) {
    return roleRepository.findOne(id);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param pageable
   * @param enabled
   * @return
   */
  @Override
  public Page<Role> findList(Pageable pageable, Boolean enabled) {
    Specification<Role> spec = new RoleSpecification(enabled);
    return roleRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param role
   * @return
   */
  @Override
  public Role save(Role role) {
    role.setEnabled(true);
    return roleRepository.save(role);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param id
   * @return
   */
  @Override
  public Role enabledOrNot(Long id) {
    Role foundRole = roleRepository.findOne(id);
    if (foundRole == null)
      return null;
    foundRole.setEnabled(!foundRole.isEnabled());
    return roleRepository.save(foundRole);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param name
   * @return
   */
  @Override
  public Role findByName(String name) {
    return roleRepository.findByName(name);
  }

}
