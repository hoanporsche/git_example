package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.repository.MaterialDailyReportRepository;
import ds.upgrade.service.MaterialDailyReportService;

@Service
public class MaterialDailyReportServiceImpl implements MaterialDailyReportService {

  @Autowired
  private MaterialDailyReportRepository materialDailyReportRepository;
  
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<MaterialDailyReport> findAll() {
    return materialDailyReportRepository.findAll();
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public MaterialDailyReport findOne(Long id) {
    return materialDailyReportRepository.findOne(id);
  }

}
