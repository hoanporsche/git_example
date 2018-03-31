package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.TimekeepingStatus;

public interface TimekeepingStatusService {

  List<TimekeepingStatus> findAll();

  TimekeepingStatus findOne(Long id);
  
  Page<TimekeepingStatus> findList(Pageable pageable, Boolean enabled);
  
  TimekeepingStatus save(TimekeepingStatus timekeepingStatus);
  
  TimekeepingStatus enabledOrNot(Long id);
  
  TimekeepingStatus findByName(String name);
}
