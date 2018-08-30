package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Staff;
import ds.upgrade.model.User;
import ds.upgrade.repository.StaffRepository;
import ds.upgrade.repository.specification.StaffSpecification;
import ds.upgrade.service.StaffService;
import ds.upgrade.service.UserService;

@Service
public class StaffServiceImpl implements StaffService {

  @Autowired
  private StaffRepository staffRepository;
  @Autowired
  private UserService userService;

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<Staff> findAll() {
    return staffRepository.findAll();
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
  public Staff findOne(Long id) {
    return staffRepository.findOne(id);
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
  public Page<Staff> findList(Pageable pageable, Boolean enabled, Long storeId,
      Long workingCalenderId) {
    Specification<Staff> spec = new StaffSpecification(enabled, storeId, workingCalenderId);
    return staffRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param staff
   * @return
   */
  @Override
  public Staff save(Staff staff) {
    if (staff.getId() == null) {
      staff.setDateCreated(new Date());
    } else {
      Staff foundStaff = staffRepository.findOne(staff.getId());
      if (foundStaff == null)
        return null;
      staff.setDateCreated(foundStaff.getDateCreated());
    }
    staff.setDateUpdated(new Date());
    staff.setEnabled(true);
    return staffRepository.save(staff);
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
  public Staff enabledOrNot(Long id) {
    Staff foundStaff = staffRepository.findOne(id);
    if (foundStaff == null)
      return null;
    User user = userService.findInfoUser();
    if (userService.isStore(user.getRoles())
        && user.getStoreId().getId() != foundStaff.getStoreId())
      return null;
    foundStaff.setDateUpdated(new Date());
    foundStaff.setEnabled(!foundStaff.isEnabled());
    return staffRepository.save(foundStaff);
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
  public Staff findByIdentityCard(String identityCard) {
    return staffRepository.findByIdentityCard(identityCard);
  }

}
