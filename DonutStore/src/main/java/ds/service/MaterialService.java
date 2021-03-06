package ds.service;

import ds.form.MaterialForm;
import ds.model.Material;

import java.util.List;

public interface MaterialService {
  Iterable<Material> findAll();
  
  List<Material> findAllByStatus();
  
  Material findBymaterialCode(String materialCode);
  
  void saveMaterial(MaterialForm materialForm);
  
  void hideMaterial(Material material);
  
  void showMaterial(Material material);
  
  Material findOneFromList(List<Material> materials, String materialId);
}
