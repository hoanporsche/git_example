package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.model.Store;
import ds.upgrade.repository.MaterialDailyReportRepository;
import ds.upgrade.repository.StoreRepository;
import ds.upgrade.repository.specification.MaterialDailyReportSpecification;
import ds.upgrade.service.MaterialDailyReportService;

@Service
public class MaterialDailyReportServiceImpl implements MaterialDailyReportService {

  @Autowired
  private MaterialDailyReportRepository materialDailyReportRepository;
  @Autowired
  private StoreRepository storeRepository;

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

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 31, 2018
   * @modifier: hoan
   * @modifier_date: Mar 31, 2018
   * @param storeId
   * @param materialId
   * @param startDate
   * @param endDate
   * @param pageable
   * @return
   */
  @Override
  public Page<MaterialDailyReport> findList(String storeName, Long materialId, Date startDate,
      Date endDate, Pageable pageable) {
    Specification<MaterialDailyReport> spec = new MaterialDailyReportSpecification(storeName,
        materialId, startDate, endDate);
    return materialDailyReportRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 1, 2018
   * @modifier: hoan
   * @modifier_date: Apr 1, 2018
   * @param dateCreated
   * @return
   */
  @Override
  public List<MaterialDailyReport> findDailyReport(String dateCreated, String storeName) {
    return materialDailyReportRepository.findDailyReport(dateCreated, storeName);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 4, 2018
   * @modifier: hoan
   * @modifier_date: Apr 4, 2018
   * @param listReport
   * @return
   */
  @Override
  public List<MaterialDailyReport> save(List<MaterialDailyReport> listReport, String storeName) {
    List<MaterialDailyReport> listSavedReport = new ArrayList<>();
    Store store = storeRepository.findByName(storeName);
    for (int i = 0; i < listReport.size(); i++) {
      MaterialDailyReport savedReport = listReport.get(i);
      savedReport.setDateCreated(new Date());
      savedReport.setStoreId(store);
      savedReport = materialDailyReportRepository.save(savedReport);
      if (savedReport == null) {
        return null;
      }
      listSavedReport.add(savedReport);
    }
    return listSavedReport;
  }

}
