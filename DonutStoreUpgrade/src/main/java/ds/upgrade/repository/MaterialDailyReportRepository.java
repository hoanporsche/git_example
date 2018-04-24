/**
 * 
 */
package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public interface MaterialDailyReportRepository extends JpaRepository<MaterialDailyReport, Long>,
    JpaSpecificationExecutor<MaterialDailyReport> {

  @Query("SELECT mdr FROM MaterialDailyReport mdr WHERE CONVERT(mdr.dateCreated, DATE) = :dateCreated AND mdr.storeId.name = :name ")
  List<MaterialDailyReport> findDailyReport(
      @Param(Constants.PARAM.DATE_CREATED_PARAM) String dateCreated,
      @Param(Constants.PARAM.NAME_PARAM) String storeName);
}
