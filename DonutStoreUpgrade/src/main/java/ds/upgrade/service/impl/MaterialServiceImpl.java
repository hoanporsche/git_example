package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Material;
import ds.upgrade.repository.MaterialRepository;
import ds.upgrade.service.MaterialService;

@Service
public class MaterialServiceImpl implements MaterialService {
  
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
  public List<Material> findAll() {
    return materialRepository.findAll();
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
  public Material findOne(Long id) {
    return materialRepository.findOne(id);
  }

}
