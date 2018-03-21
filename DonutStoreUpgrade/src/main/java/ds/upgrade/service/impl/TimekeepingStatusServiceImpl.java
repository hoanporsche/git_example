package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.TimekeepingStatus;
import ds.upgrade.repository.TimekeepingStatusRepository;
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

}
