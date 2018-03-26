package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Timekeeping;
import ds.upgrade.repository.TimekeepingRepository;
import ds.upgrade.service.TimekeepingService;

@Service
public class TimekeepingServiceImpl implements TimekeepingService {

  @Autowired
  private TimekeepingRepository timekeepingRepository;
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<Timekeeping> findAll() {
    return timekeepingRepository.findAll();
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
  public Timekeeping findOne(Long id) {
    return timekeepingRepository.findOne(id);
  }

}
