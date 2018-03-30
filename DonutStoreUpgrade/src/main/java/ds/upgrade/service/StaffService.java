package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Staff;

public interface StaffService {

  List<Staff> findAll();

  Staff findOne(Long id);
  
  Page<Staff> findList(Pageable pageable, Boolean enabled, Long storeId, Long workingCalenderId);
  
  Staff save(Staff staff);
  
  Staff enabledOrNot(Long id);
  
  Staff findByIdentityCard(String identityCard);
}
