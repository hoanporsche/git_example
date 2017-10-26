package DS.service;

import DS.model.Timekeeping;

public interface TimekeepingService {
	Iterable<Timekeeping> findAll();
	void save(Timekeeping timekeeping);
	void delete(int id);
	Timekeeping findOne(int id);
}
