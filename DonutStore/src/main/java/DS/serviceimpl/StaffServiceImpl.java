package DS.serviceimpl;

import DS.model.Staff;
import DS.repository.StaffRepository;
import DS.service.StaffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl implements StaffService {
  @Autowired
  private StaffRepository staffRepository;
  
  @Override
  public Iterable<Staff> findAll() {
    return staffRepository.findAll();
  }

  @Override
  public void save(Staff staff) {
    staffRepository.save(staff);
  }

  @Override
  public void delete(int id) {
    staffRepository.delete(id);
  }

  @Override
  public Staff findOne(int id) {
    return staffRepository.findOne(id);
  }

}
