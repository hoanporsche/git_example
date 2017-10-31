package ds.service;

import ds.model.Timekeeping;

public interface TimekeepingService {
  Iterable<Timekeeping> findAll();

  void save(Timekeeping timekeeping);

  void delete(int id);

  Timekeeping findOne(int id);
}
