package ds.serviceimpl;

import ds.form.MaterialForm;
import ds.model.Material;
import ds.repository.MaterialRepository;
import ds.service.MaterialService;
import ds.util.Constant;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialServiceImpl implements MaterialService {
  @Autowired
  private MaterialRepository materialRepository;

  @Override
  public List<Material> findAllByStatus() {
    List<Material> listMaterial = new ArrayList<>();
    List<Material> listMaterialFound = (List<Material>) materialRepository.findAll();
    for (int i = 0; i < listMaterialFound.size(); i++) {
      if (listMaterialFound.get(i).isMaterialStatus() == true) {
        listMaterial.add(listMaterialFound.get(i));
      }
    }
    return listMaterial;
  }

  @Override
  public void saveMaterial(MaterialForm materialForm) {
    Material material = new Material();
    
    if (materialForm.getMaterialCode() == null) {
      material.setMaterialCode(RandomStringUtils.random(10, Constant.RANDOM_STRING));
      material.setMaterialDateCreated(new Date());
    } else {
      material.setMaterialId(materialForm.getMaterialId());
      material.setMaterialCode(materialForm.getMaterialCode());
      try {
        material.setMaterialDateCreated(new SimpleDateFormat(Constant.DATEFORMAT)
            .parse(materialForm.getMaterialDateCreated()));
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    
    material.setMaterialName(materialForm.getMaterialName());
    material.setMaterialDateUpdated(new Date());
    material.setMaterialSingleValue(new BigDecimal(materialForm.getMaterialSingleValue()));
    material.setMaterialRemain(materialForm.getMaterialRemain().toString());
    material.setMaterialSupplyName(materialForm.getMaterialSupplyName());
    material.setMaterialSupplyPhone(materialForm.getMaterialSupplyPhone());
    material.setMaterialStatus(true);
    materialRepository.save(material);
  }

  @Override
  public void hideMaterial(Material material) {
    material.setMaterialStatus(false);
    materialRepository.save(material);
  }
  
  @Override
  public Material findOneFromList(List<Material> materials, String materialCode) {
    for (int i = 0; i < materials.size(); i++) {
      if (materialCode.equals(materials.get(i).getMaterialCode())) {
        return materials.get(i);
      }
    }
    return null;
  }

  @Override
  public Iterable<Material> findAll() {
    return materialRepository.findAll();
  }

}
