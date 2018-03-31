package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Timekeeping;
import ds.upgrade.repository.TimekeepingRepository;
import ds.upgrade.repository.specification.TimekeepingSpecification;
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

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 29, 2018
   * @modifier: hoan
   * @modifier_date: Mar 29, 2018
   * @param statusId
   * @param staffId
   * @param storeId
   * @param startDate
   * @param endDate
   * @param pageable
   * @return
   */
  @Override
  public Page<Timekeeping> findList(Long statusId, Long staffId, Long storeId, Date startDate,
      Date endDate, Pageable pageable) {
    Specification<Timekeeping> spec = new TimekeepingSpecification(statusId, staffId, storeId,
        startDate, endDate);
    return timekeepingRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 29, 2018
   * @modifier: hoan
   * @modifier_date: Mar 29, 2018
   * @param statusId
   * @param staffId
   * @param storeId
   * @param startDate
   * @param endDate
   * @param page
   * @param size
   * @return
   */
  @Override
  public List<Timekeeping> findList(Long statusId, Long staffId, Long storeId, Date startDate,
      Date endDate, Long page, Long size) {
    // TODO Auto-generated method stub
    return null;
  }

}
