package ds.serviceimpl;

import ds.form.MaterialForm;
import ds.model.Material;
import ds.repository.MaterialRepository;
import ds.service.MaterialService;
import ds.util.DateConstant;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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

  @Override
  public void createMaterial(MaterialForm materialForm) {
    Material material = new Material();
    if (materialForm.getMaterialId() != null) {
      material.setMaterialId(materialForm.getMaterialId());
      try {
        material.setMaterialDateCreated(new SimpleDateFormat(DateConstant.DATEFORMAT)
            .parse(materialForm.getMaterialDateCreated()));
      } catch (ParseException e) {
        e.printStackTrace();
      }
    } else {
      material.setMaterialDateCreated(new Date());
    }
    material.setMaterialName(materialForm.getMaterialName());
    material.setMaterialDateUpdated(new Date());
    material.setMaterialSingleValue(new BigDecimal(materialForm.getMaterialSingleValue()));
    material.setMaterialRemain(materialForm.getMaterialRemain().toString());
    material.setMaterialSupplyName(materialForm.getMaterialSupplyName());
    material.setMaterialSupplyPhone(materialForm.getMaterialSupplyPhone());
    materialRepository.save(material);
  }

  @Override
  public void hideMaterial(MaterialForm materialForm) {
    // TODO Auto-generated method stub
    
  }

}
