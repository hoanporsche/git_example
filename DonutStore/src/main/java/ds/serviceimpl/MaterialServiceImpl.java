package ds.serviceimpl;

import ds.model.Material;
import ds.repository.MaterialRepository;
import ds.service.MaterialService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialServiceImpl implements MaterialService {
  @Autowired
  private MaterialRepository materialRepository;

  @Override
  public Iterable<Material> findAll() {
    return materialRepository.findAll();
  }

  @Override
  public void save(Material material) {
    materialRepository.save(material);
  }

  @Override
  public void delete(int id) {
    materialRepository.delete(id);
  }

  @Override
  public Material findOne(int id) {
    return materialRepository.findOne(id);
  }

}
