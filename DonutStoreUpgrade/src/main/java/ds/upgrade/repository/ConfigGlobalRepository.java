package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.upgrade.model.ConfigGlobal;

public interface ConfigGlobalRepository extends JpaRepository<ConfigGlobal, String> {

  ConfigGlobal findByname(String name);
}
