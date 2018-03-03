package ds.repository;

import ds.model.Staff;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
 
  public Staff findBystaffCode(String staffCode);
}
