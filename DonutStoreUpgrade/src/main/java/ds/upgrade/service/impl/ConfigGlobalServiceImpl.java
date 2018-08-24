package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.ConfigGlobal;
import ds.upgrade.repository.ConfigGlobalRepository;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.service.CustomValidation;

@Service
public class ConfigGlobalServiceImpl implements ConfigGlobalService {

  @Autowired
  private ConfigGlobalRepository configGlobalRepository;
  @Autowired
  private CustomValidation customValidation;

  @Override
  public ConfigGlobal createOrUpdate(ConfigGlobal cg) {
    return configGlobalRepository.save(cg);
  }

  @Override
  public ConfigGlobal findByname(String name) {
    return configGlobalRepository.findByname(name);
  }

  @Override
  public List<ConfigGlobal> findAll() {
    return configGlobalRepository.findAll();
  }

  @Override
  public Boolean delete(ConfigGlobal cg) {
    if (customValidation.notDeleteConfigGlobal(cg.getName()))
      return Boolean.FALSE;
    configGlobalRepository.delete(cg);
    return Boolean.TRUE;
  }

}
