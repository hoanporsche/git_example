package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.MaterialDailyReport;

public interface MaterialDailyReportService {

  List<MaterialDailyReport> findAll();

  MaterialDailyReport findOne(Long id);
}
