package ds.upgrade.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Timekeeping;

public interface TimekeepingService {

  List<Timekeeping> findAll();

  Timekeeping findOne(Long id);

  Page<Timekeeping> findList(Long statusId, Long staffId, Long storeId, Date startDate,
      Date endDate, Pageable pageable);
  
  List<Timekeeping> findList(Long statusId, Long staffId, Long storeId, Date startDate,
      Date endDate, Long page, Long size);
}
