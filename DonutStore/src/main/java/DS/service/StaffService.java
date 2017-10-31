package ds.service;

import ds.model.Staff;

public interface StaffService {
  Iterable<Staff> findAll();

  void save(Staff staff);

  void delete(int id);

  Staff findOne(int id);
}
