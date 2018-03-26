package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Supply;
import ds.upgrade.repository.SupplyRepository;
import ds.upgrade.service.SupplyService;

@Service
public class SupplyServiceImpl implements SupplyService {

  @Autowired
  private SupplyRepository supplyRepository;
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<Supply> findAll() {
    return supplyRepository.findAll();
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
  public Supply findOne(Long id) {
    return supplyRepository.findOne(id);
  }

  
}
