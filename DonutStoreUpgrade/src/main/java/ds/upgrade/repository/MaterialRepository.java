package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.Material;

public interface MaterialRepository
    extends JpaRepository<Material, Long>, JpaSpecificationExecutor<Material> {
  
  @Query("SELECT m FROM Material m WHERE m.enabled = true")
  List<Material> findAll();
}
