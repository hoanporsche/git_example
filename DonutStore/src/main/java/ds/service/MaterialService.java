package ds.service;

import ds.form.MaterialForm;
import ds.model.Material;

import java.util.List;

public interface MaterialService {
  List<Material> findAll();
  
  void saveMaterial(MaterialForm materialForm);
  
  void hideMaterial(Material material);
  
  Material findOneFromList(List<Material> materials, String materialId);
}
