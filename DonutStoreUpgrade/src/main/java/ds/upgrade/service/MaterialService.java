package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Material;

public interface MaterialService {
  
  List<Material> findAll();

  Material findOne(Long id);
  
  Page<Material> findList(Pageable pageable, Boolean enabled);
  
  Material save(Material material);
  
  Material enabledOrNot(Long id);
  
  Material findByName(String name);
}
