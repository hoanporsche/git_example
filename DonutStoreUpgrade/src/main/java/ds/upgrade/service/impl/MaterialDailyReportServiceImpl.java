package ds.upgrade.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.model.MaterialReport;
import ds.upgrade.model.Store;
import ds.upgrade.repository.MaterialDailyReportRepository;
import ds.upgrade.repository.MaterialReportRepository;
import ds.upgrade.repository.StoreRepository;
import ds.upgrade.repository.specification.MaterialDailyReportSpecification;
import ds.upgrade.service.MaterialDailyReportService;
import ds.upgrade.util.AppConstant;

@Service
public class MaterialDailyReportServiceImpl implements MaterialDailyReportService {

  @Autowired
  private MaterialDailyReportRepository materialDailyReportRepository;
  @Autowired
  private StoreRepository storeRepository;
  @Autowired
  private MaterialReportRepository materialReportRepository;

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
  public Page<MaterialDailyReport> findList(String storeCode, Date startDate,
      Date endDate, Pageable pageable) {
    Specification<MaterialDailyReport> spec = new MaterialDailyReportSpecification(storeCode, startDate, endDate);
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
  public MaterialDailyReport findDailyReport(String dateCreated, String storeCode) {
    return materialDailyReportRepository.findDailyReport(dateCreated, storeCode);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 4, 2018
   * @modifier: hoan
   * @modifier_date: Apr 4, 2018
   * @param report
   * @return
   */
  @Override
  public Boolean save(MaterialDailyReport report, String storeCode) {
    // If report doesn't have id, will check to create
    SimpleDateFormat dateFormat = new SimpleDateFormat(AppConstant.FORMAT.DATE_FORMAT_1);
    MaterialDailyReport foundReport = findDailyReport(dateFormat.format(new Date()).toString(),
        storeCode);
    if (report.getId() == null) {
      if (foundReport.getListMaterialReport().size() > 0)
        return Boolean.FALSE;
      return saveOneByOneReport(report, storeCode);
    }
    // If list has id , will check to update
    if (willUpdateIfItIsOldList(report.getListMaterialReport(),
        foundReport.getListMaterialReport()))
      return saveOneByOneReport(report, storeCode);
    return Boolean.FALSE;
  }

  private Boolean saveOneByOneReport(MaterialDailyReport report, String storeCode) {
    Store store = storeRepository.findBycode(storeCode);
    MaterialDailyReport savedReport = new MaterialDailyReport(report.getId(), store,
        new Date());
    savedReport = materialDailyReportRepository.save(savedReport);
    if (savedReport == null)
      return Boolean.FALSE;
    List<MaterialReport> listSavedMaterialReport = new ArrayList<>();
    for (int i = 0; i < report.getListMaterialReport().size(); i++) {
      MaterialReport saved = materialReportRepository.save(report.getListMaterialReport().get(i));
      /**
       * If : not save, delete all saved items
       * else : add to listSaved
       */
      if (saved == null && listSavedMaterialReport != null) {
        /**
         * If not save item, the listSaved always one piece less than list
         */
        for (int j = 0; j < i; j++) {
          materialReportRepository.delete(listSavedMaterialReport.get(j).getId());
        }
        return Boolean.FALSE;
      } else {
        listSavedMaterialReport.add(saved);
      }
    }
    return Boolean.TRUE;
  }

  private boolean willUpdateIfItIsOldList(List<MaterialReport> listReport,
      List<MaterialReport> listFoundReport) {
    // If 2 list sizes difference, wrong input
    if (listReport.size() != listFoundReport.size())
      return false;
    // Check 2 list have id and material are equal
    for (int i = 0; i < listReport.size(); i++) {
      MaterialReport newReport = listReport.get(i);
      MaterialReport oldReport = listFoundReport.get(i);
      if ((newReport.getId() != oldReport.getId())
          || (newReport.getMaterialId() != oldReport.getMaterialId()))
        return false;
    }
    return true;
  }
}
