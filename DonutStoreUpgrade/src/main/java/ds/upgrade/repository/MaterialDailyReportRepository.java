/**
 * 
 */
package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.MaterialDailyReport;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public interface MaterialDailyReportRepository extends JpaRepository<MaterialDailyReport, Long>,
  JpaSpecificationExecutor<MaterialDailyReport> {

}
