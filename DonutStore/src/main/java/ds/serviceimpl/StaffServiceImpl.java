package ds.serviceimpl;

import ds.form.StaffForm;
import ds.model.Staff;
import ds.repository.StaffRepository;
import ds.repository.StoreRepository;
import ds.service.StaffService;
import ds.util.Constant;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl implements StaffService {
  @Autowired
  private StaffRepository staffRepository;
  
  @Autowired
  private StoreRepository storeRepository;

  @Override
  public Iterable<Staff> findAll() {
    return staffRepository.findAll();
  }
  
  @Override
  public List<Staff> findAllByStatus() {
    List<Staff> listStaffFound = (List<Staff>) staffRepository.findAll();
    for (int i = 0; i < listStaffFound.size(); i++) {
      if (listStaffFound.get(i).getStaffStatus() == false) {
        listStaffFound.remove(listStaffFound.get(i));
      }
    }
    return listStaffFound;
  }

  @Override
  public void save(StaffForm staffForm) {
    Staff staff = new Staff();
    if (StringUtils.isEmpty(staffForm.getStaffCode())) {
      staff.setStaffCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
      staff.setStaffCreatedTime(new Date());
    } else {
      Staff s = staffRepository.findBystaffCode(staffForm.getStaffCode());
      staff.setStaffCode(staffForm.getStaffCode());
      staff.setStaffId(s.getStaffId());
      staff.setStaffCreatedTime(s.getStaffCreatedTime());
    }
    staff.setStaffName(staffForm.getStaffName());
    staff.setStaffPicture(staffForm.getStaffPicture());
    staff.setStaffStore(storeRepository.findBystoreCode(staffForm.getStoreCode()));
    staff.setStaffUpdatedTime(new Date());
    staff.setStaffPhoneNumber(staffForm.getStaffPhoneNumber());
    staff.setStaffAddress(staffForm.getStaffAddress());
    staff.setStaffIdentityCard(staffForm.getStaffIdentityCard());
    staff.setStaffHomeTown(staffForm.getStaffHomeTown());
    staff.setStaffSalary(new BigDecimal(staffForm.getStaffSalary()));
    staff.setStaffStatus(true);
    staffRepository.save(staff);
  }

  @Override
  public void hideStaff(Staff staff) {
    staff.setStaffStatus(false);
    staff.setStaffUpdatedTime(new Date());
    staffRepository.save(staff);
  }

  @Override
  public void showStaff(Staff staff) {
    staff.setStaffStatus(true);
    staff.setStaffUpdatedTime(new Date());
    staffRepository.save(staff);
    
  }

  @Override
  public Staff findBystaffCode(String staffCode) {
    return staffRepository.findBystaffCode(staffCode);
  }



}
