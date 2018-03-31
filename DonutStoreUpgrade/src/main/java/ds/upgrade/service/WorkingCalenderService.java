package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.WorkingCalender;

public interface WorkingCalenderService {

  List<WorkingCalender> findAll();

  WorkingCalender findOne(Long id);
  
  Page<WorkingCalender> findList(Pageable pageable, Boolean enabled);
  
  WorkingCalender save(WorkingCalender workingCalender);
  
  WorkingCalender enabledOrNot(Long id);
  
  WorkingCalender findByName(String name);
}
