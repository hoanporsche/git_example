package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Material;
import ds.upgrade.util.AppConstants;

public interface MaterialRepository
    extends JpaRepository<Material, Long>, JpaSpecificationExecutor<Material> {
  
  @Query("SELECT m FROM Material m WHERE m.enabled = true")
  List<Material> findAll();
  
  Material findByName(String name);
  
  @Query("SELECT m FROM Material m WHERE m.supplyId.id = :id")
  List<Material> findBySupply(@Param(AppConstants.PARAM.ID_PARAM) Long id);
}
