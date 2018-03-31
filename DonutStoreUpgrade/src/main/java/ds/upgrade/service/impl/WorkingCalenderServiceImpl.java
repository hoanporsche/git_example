package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.WorkingCalender;
import ds.upgrade.repository.WorkingCalenderRepository;
import ds.upgrade.repository.specification.WorkingCalenderSpecification;
import ds.upgrade.service.WorkingCalenderService;

@Service
public class WorkingCalenderServiceImpl implements WorkingCalenderService {

  @Autowired
  private WorkingCalenderRepository workingCalenderRepository;
  
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<WorkingCalender> findAll() {
    return workingCalenderRepository.findAll();
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
  public WorkingCalender findOne(Long id) {
    return workingCalenderRepository.findOne(id);
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
  public Page<WorkingCalender> findList(Pageable pageable, Boolean enabled) {
    Specification<WorkingCalender> spec = new WorkingCalenderSpecification(enabled);
    return workingCalenderRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param workingCalender
   * @return
   */
  @Override
  public WorkingCalender save(WorkingCalender workingCalender) {
    workingCalender.setEnabled(true);
    return workingCalenderRepository.save(workingCalender);
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
  public WorkingCalender enabledOrNot(Long id) {
    WorkingCalender foundWorkingCalender = workingCalenderRepository.findOne(id);
    if (foundWorkingCalender == null)
      return null;
    foundWorkingCalender.setEnabled(!foundWorkingCalender.isEnabled());
    return workingCalenderRepository.save(foundWorkingCalender);
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
  public WorkingCalender findByName(String name) {
    return workingCalenderRepository.findByName(name);
  }

}
