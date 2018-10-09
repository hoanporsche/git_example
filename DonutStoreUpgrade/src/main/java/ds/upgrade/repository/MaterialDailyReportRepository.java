/**
 * 
 */
package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public interface MaterialDailyReportRepository extends JpaRepository<MaterialDailyReport, Long>,
    JpaSpecificationExecutor<MaterialDailyReport> {

  @Query(QueryConstant.MATERIAL_DAILY_REPORT.FIND_DAILY_REPORT)
  MaterialDailyReport findDailyReport(
      @Param(AppConstant.PARAM.DATE_CREATED_PARAM) String dateCreated,
      @Param(AppConstant.PARAM.STORE_CODE_PARAM) String storeCode);
}
