package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
  public Quantity findOne(String code) {
    return quantityRepository.findOne(code);
  }

  /**
   * @description: save all quantity in list
   * @author: VDHoan
   * @created_date: Aug 22, 2018
   * @param list
   * @return true if savedList == inputlist
   */
  @Override
  public Boolean saveList(List<Quantity> list) {
    List<Quantity> savedList = new ArrayList<>();
    for(Quantity quantity: list) {
      Quantity saved = quantityRepository.save(quantity);
      if (saved != null)
        savedList.add(saved);
    }
    return (savedList.size() == list.size());
  }

  @Override
  public void deleteByOrderCode(String code) {
    quantityRepository.deleteByOrderCode(code);
  }

}
