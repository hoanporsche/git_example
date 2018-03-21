package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Staff;

public interface StaffService {

  List<Staff> findAll();

  Staff findOne(Long id);
}
