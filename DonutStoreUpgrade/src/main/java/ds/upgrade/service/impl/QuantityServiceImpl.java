package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Quantity;
import ds.upgrade.repository.QuantityRepository;
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
  public List<Quantity> findAll() {
    return quantityRepository.findAll();
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
