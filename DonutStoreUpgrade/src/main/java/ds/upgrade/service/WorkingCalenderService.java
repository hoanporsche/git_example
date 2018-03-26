package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.WorkingCalender;

public interface WorkingCalenderService {

  List<WorkingCalender> findAll();

  WorkingCalender findOne(Long id);
}
