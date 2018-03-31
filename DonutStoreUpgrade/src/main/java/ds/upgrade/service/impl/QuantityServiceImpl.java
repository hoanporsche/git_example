package ds.upgrade.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Quantity;
import ds.upgrade.repository.QuantityRepository;
import ds.upgrade.repository.specification.QuantitySpecification;
import ds.upgrade.service.QuantityService;

@Service
public class QuantityServiceImpl implements QuantityService {

  @Autowired
  private QuantityRepository quantityRepository;

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public Page<Quantity> findList(Pageable pageable, Long storeId, Long itemId, Date startDate,
      Date endDate, Boolean isShipping) {
    Specification<Quantity> spec = new QuantitySpecification(storeId, itemId, startDate, endDate,
        isShipping);
    return quantityRepository.findAll(spec, pageable);
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
  public Quantity findOne(Long id) {
    return quantityRepository.findOne(id);
  }

}
