package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Staff;
import ds.upgrade.util.Constants;

public interface StaffRepository extends JpaRepository<Staff, Long>, JpaSpecificationExecutor<Staff> {
 
  @Query("SELECT s FROM Staff s WHERE s.enabled = true")
  List<Staff> findAll();
  
  Staff findByIdentityCard(String identityCard);
  
  @Query("SELECT s FROM Staff s WHERE s.storeId.id = :id")
  List<Staff> findByStore(@Param(Constants.PARAM.ID_PARAM) Long id);
}
