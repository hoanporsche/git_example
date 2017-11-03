package ds.service;

import ds.model.Material;

public interface MaterialService {
  Iterable<Material> findAll();

  void save(Material material);

  void delete(int id);

  Material findOne(int id);
}