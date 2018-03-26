package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Timekeeping;

public interface TimekeepingService {

  List<Timekeeping> findAll();

  Timekeeping findOne(Long id);
}
