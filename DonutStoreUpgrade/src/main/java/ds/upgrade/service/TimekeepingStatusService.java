package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.TimekeepingStatus;

public interface TimekeepingStatusService {

  List<TimekeepingStatus> findAll();

  TimekeepingStatus findOne(Long id);
}
