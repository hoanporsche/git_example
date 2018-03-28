package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.TimekeepingStatus;
import ds.upgrade.repository.TimekeepingStatusRepository;
import ds.upgrade.repository.specification.TimekeepingStatusSpecification;
import ds.upgrade.service.TimekeepingStatusService;

@Service
public class TimekeepingStatusServiceImpl implements TimekeepingStatusService {

  @Autowired
  private TimekeepingStatusRepository timekeepingStatusRepository;
  
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<TimekeepingStatus> findAll() {
    return timekeepingStatusRepository.findAll();
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
  public TimekeepingStatus findOne(Long id) {
    return timekeepingStatusRepository.findOne(id);
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
  public Page<TimekeepingStatus> findList(Pageable pageable, Boolean enabled) {
    Specification<TimekeepingStatus> spec = new TimekeepingStatusSpecification(enabled);
    return timekeepingStatusRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param timekeepingStatus
   * @return
   */
  @Override
  public TimekeepingStatus save(TimekeepingStatus timekeepingStatus) {
    timekeepingStatus.setEnabled(true);
    return timekeepingStatusRepository.save(timekeepingStatus);
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
  public TimekeepingStatus enabledOrNot(Long id) {
    TimekeepingStatus foundTimekeepingStatus = timekeepingStatusRepository.findOne(id);
    if (foundTimekeepingStatus == null)
      return null;
    foundTimekeepingStatus.setEnabled(!foundTimekeepingStatus.isEnabled());
    return timekeepingStatusRepository.save(foundTimekeepingStatus);
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
  public TimekeepingStatus findByName(String name) {
    return timekeepingStatusRepository.findByName(name);
  }  
}

