package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.ConfigGlobal;

public interface ConfigGlobalService {

  ConfigGlobal createOrUpdate(ConfigGlobal cg);
  ConfigGlobal findByname(String name);
  List<ConfigGlobal> findAll();
  Boolean delete(ConfigGlobal cg);
}
