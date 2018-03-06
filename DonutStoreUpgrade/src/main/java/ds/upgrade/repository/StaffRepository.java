package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long>, JpaSpecificationExecutor<Staff> {
 
}
