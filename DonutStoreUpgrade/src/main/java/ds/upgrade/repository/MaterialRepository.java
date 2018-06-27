package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Material;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface MaterialRepository
    extends JpaRepository<Material, Long>, JpaSpecificationExecutor<Material> {
  
  @Query(QueryConstant.MATERIAL.FIND_ALL)
  List<Material> findAll();
  
  Material findByName(String name);
  
  @Query(QueryConstant.MATERIAL.FIND_BY_SUPPLY)
  List<Material> findBySupply(@Param(AppConstant.PARAM.ID_PARAM) Long id);
}
