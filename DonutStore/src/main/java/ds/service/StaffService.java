package ds.service;

import ds.form.StaffForm;
import ds.model.Staff;

import java.util.List;

public interface StaffService {
  Iterable<Staff> findAll();
  
  List<Staff> findAllByStatus();

  void save(StaffForm staffForm);
  
  void hideStaff(Staff staff);
  
  void showStaff(Staff staff);

  Staff findBystaffCode(String staffCode);
}
