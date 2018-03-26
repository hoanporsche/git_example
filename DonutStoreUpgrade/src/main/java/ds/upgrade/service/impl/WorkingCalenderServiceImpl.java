package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.WorkingCalender;
import ds.upgrade.repository.WorkingCalenderRepository;
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

}
