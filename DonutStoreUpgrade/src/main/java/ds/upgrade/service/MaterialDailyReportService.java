package ds.upgrade.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.MaterialDailyReport;

public interface MaterialDailyReportService {

  Page<MaterialDailyReport> findList(String storeCode, Long materialId, Date startDate, Date endDate,
      Pageable pageable);

  MaterialDailyReport findOne(Long id);
  
  MaterialDailyReport findDailyReport(String dateCreated, String storeCode);
  
  Boolean save(MaterialDailyReport listReport, String storeCode);
}
