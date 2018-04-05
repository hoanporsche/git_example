package ds.upgrade.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.MaterialDailyReport;

public interface MaterialDailyReportService {

  Page<MaterialDailyReport> findList(Long storeId, Long materialId, Date startDate, Date endDate,
      Pageable pageable);

  MaterialDailyReport findOne(Long id);
  
  List<MaterialDailyReport> findDailyReport(String dateCreated, Long storeId);
  
  List<MaterialDailyReport> save(List<MaterialDailyReport> listReport);
}
