package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Material;
import ds.upgrade.repository.MaterialRepository;
import ds.upgrade.repository.specification.MaterialSpecification;
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
  public Page<Material> findList(Pageable pageable, Boolean enabled, Long supplyId) {
    Specification<Material> spec = new MaterialSpecification(enabled, supplyId);
    return materialRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param material
   * @return
   */
  @Override
  public Material save(Material material) {
    if (material.getId() == null) {
      material.setDateCreated(new Date());
    } else {
      Material foundMaterial = materialRepository.findOne(material.getId());
      if (foundMaterial == null)
        return null;
      material.setDateCreated(foundMaterial.getDateCreated());
    }
    material.setDateUpdated(new Date());
    material.setEnabled(true);
    return materialRepository.save(material);
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
  public Material enabledOrNot(Long id) {
    Material foundMaterial = materialRepository.findOne(id);
    if (foundMaterial == null)
      return null;
    if (!foundMaterial.getSupplyId().isEnabled()) {
      return null;
    }
    foundMaterial.setDateUpdated(new Date());
    foundMaterial.setEnabled(!foundMaterial.isEnabled());
    return materialRepository.save(foundMaterial);
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
  public Material findByName(String name) {
    return materialRepository.findByName(name);
  }

}
