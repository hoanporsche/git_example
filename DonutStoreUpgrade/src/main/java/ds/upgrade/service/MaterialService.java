package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Material;

public interface MaterialService {
  
  List<Material> findAll();

  Material findOne(Long id);
}
