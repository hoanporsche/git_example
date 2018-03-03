package ds.service.impl;

import ds.form.MaterialForm;
import ds.model.Material;
import ds.repository.MaterialRepository;
import ds.repository.SupplyRepository;
import ds.service.MaterialService;
import ds.util.Constant;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialServiceImpl implements MaterialService {
  @Autowired
  private MaterialRepository materialRepository;
  @Autowired
  private SupplyRepository supplyRepository;

  @Override
  public List<Material> findAllByStatus() {
    List<Material> listMaterialFound = (List<Material>) materialRepository.findAll();
    for (int i = 0; i < listMaterialFound.size(); i++) {
      if (listMaterialFound.get(i).isMaterialStatus() == false) {
        listMaterialFound.remove(listMaterialFound.get(i));
      }
    }
    return listMaterialFound;
  }

  @Override
  public Material findBymaterialCode(String materialCode) {
    return materialRepository.findBymaterialCode(materialCode);
  }
  
  @Override
  public void saveMaterial(MaterialForm materialForm) {
    Material material = new Material();
    
    if (materialForm.getMaterialCode() == null) {
      material.setMaterialCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
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
    
    material.setMaterialSupply(supplyRepository.findBysupplyCode(materialForm.getSupplyCode()));
    material.setMaterialName(materialForm.getMaterialName());
    material.setMaterialDateUpdated(new Date());
    material.setMaterialSingleValue(new BigDecimal(materialForm.getMaterialSingleValue()));
    material.setMaterialStatus(true);
    materialRepository.save(material);
  }

  @Override
  public void hideMaterial(Material material) {
    material.setMaterialStatus(false);
    material.setMaterialDateUpdated(new Date());
    materialRepository.save(material);
  }
  
  @Override
  public void showMaterial(Material material) {
    material.setMaterialStatus(true);
    material.setMaterialDateUpdated(new Date());
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
