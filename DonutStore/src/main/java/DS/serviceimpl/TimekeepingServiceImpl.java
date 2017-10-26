package DS.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DS.model.Timekeeping;
import DS.repository.TimekeepingRepository;
import DS.service.TimekeepingService;

@Service
public class TimekeepingServiceImpl implements TimekeepingService {
	@Autowired
	private TimekeepingRepository timekeepingRepository;
	@Override
	public Iterable<Timekeeping> findAll() {
		return timekeepingRepository.findAll();
	}

	@Override
	public void save(Timekeeping timekeeping) {
		timekeepingRepository.save(timekeeping);
	}

	@Override
	public void delete(int id) {
		timekeepingRepository.delete(id);
	}

	@Override
	public Timekeeping findOne(int id) {
		return timekeepingRepository.findOne(id);
	}

}
