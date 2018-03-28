package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Material;
import ds.upgrade.model.Supply;
import ds.upgrade.repository.MaterialRepository;
import ds.upgrade.repository.SupplyRepository;
import ds.upgrade.repository.specification.SupplySpecification;
import ds.upgrade.service.SupplyService;

@Service
public class SupplyServiceImpl implements SupplyService {

  @Autowired
  private SupplyRepository supplyRepository;
  @Autowired
  private MaterialRepository materialRepository;
  
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
  public Page<Supply> findList(Pageable pageable, Boolean enabled) {
    Specification<Supply> spec = new SupplySpecification(enabled);
    return supplyRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param supply
   * @return
   */
  @Override
  public Supply save(Supply supply) {
    if (supply.getId() == null) {
      supply.setDateCreated(new Date());
    } else {
      Supply foundSupply = supplyRepository.findOne(supply.getId());
      if (foundSupply == null)
        return null;
      supply.setDateCreated(foundSupply.getDateCreated());
    }
    supply.setDateUpdated(new Date());
    supply.setEnabled(true);
    return supplyRepository.save(supply);
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
  public Supply enabledOrNot(Long id) {
    Supply foundSupply = supplyRepository.findOne(id);
    if (foundSupply == null)
      return null;
    if (foundSupply.isEnabled()) {
      List<Material> list = materialRepository.findBySupply(id);
      if (list.size() > 0)
        return null;
    }
    foundSupply.setDateUpdated(new Date());
    foundSupply.setEnabled(!foundSupply.isEnabled());
    return supplyRepository.save(foundSupply);
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
  public Supply findByName(String name) {
    return supplyRepository.findByName(name);
  }  
}
