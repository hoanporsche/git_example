/**
 * 
 */
package ds.upgrade.repository.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class MaterialDailyReportSpecification implements Specification<MaterialDailyReport> {
  
  private Long storeId;
  private Long materialId;
  private Date startDate;
  private Date endDate;

  public MaterialDailyReportSpecification() {
  }

  public MaterialDailyReportSpecification(Long storeId, Long materialId, Date startDate, Date endDate) {
    this.storeId = storeId;
    this.materialId = materialId;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   * @modifier: User
   * @modifier_date: Mar 6, 2018
   * @param root
   * @param arg1
   * @param cb
   * @return
   */
  @Override
  public Predicate toPredicate(Root<MaterialDailyReport> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (storeId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.STORE_ID_PARAM).get(Constants.PARAM.ID_PARAM), storeId));
    }
    if (materialId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.MATERIAL_ID_PARAM).get(Constants.PARAM.ID_PARAM), materialId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate, cb.greaterThanOrEqualTo(
          root.<Date>get(Constants.PARAM.DATE_CREATED_PARAM),
          startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate, cb.lessThanOrEqualTo(
          root.<Date>get(Constants.PARAM.DATE_CREATED_PARAM),
          endDate));
    }
    return predicate;
  }

}
