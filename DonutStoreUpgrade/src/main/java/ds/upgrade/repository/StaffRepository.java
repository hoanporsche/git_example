package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Staff;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface StaffRepository extends JpaRepository<Staff, Long>, JpaSpecificationExecutor<Staff> {
 
  @Query(QueryConstant.STAFF.FIND_ALL)
  List<Staff> findAll();
  
  Staff findByIdentityCard(String identityCard);
  
  @Query(QueryConstant.STAFF.FIND_BY_STORE)
  List<Staff> findByStore(@Param(AppConstant.PARAM.ID_PARAM) Long id);
}
