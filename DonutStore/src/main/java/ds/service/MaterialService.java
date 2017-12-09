package ds.service;

import ds.form.MaterialForm;
import ds.model.Material;

public interface MaterialService {
  Iterable<Material> findAll();

  void save(Material material);

  void delete(int id);

  Material findOne(int id);
  
  void createMaterial(MaterialForm materialForm);
  
  void hideMaterial(MaterialForm materialForm);
}
