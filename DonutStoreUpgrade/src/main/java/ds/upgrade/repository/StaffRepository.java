package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long>, JpaSpecificationExecutor<Staff> {
 
  @Query("SELECT s FROM Staff s WHERE s.staffEnabled = true")
  List<Staff> findAll();
}
