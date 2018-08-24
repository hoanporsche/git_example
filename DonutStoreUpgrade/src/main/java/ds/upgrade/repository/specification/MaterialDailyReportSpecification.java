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
import ds.upgrade.util.AppConstant;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class MaterialDailyReportSpecification implements Specification<MaterialDailyReport> {
  
  private String storeName;
  private Long materialId;
  private Date startDate;
  private Date endDate;

  public MaterialDailyReportSpecification() {
  }

  public MaterialDailyReportSpecification(String storeName, Long materialId, Date startDate, Date endDate) {
    this.storeName = storeName;
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
    if (storeName != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<String>get(AppConstant.PARAM.STORE_ID_PARAM).get(AppConstant.PARAM.NAME_PARAM), storeName));
    }
    if (materialId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(AppConstant.PARAM.MATERIAL_ID_PARAM).get(AppConstant.PARAM.ID_PARAM), materialId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate, cb.greaterThanOrEqualTo(
          root.<Date>get(AppConstant.PARAM.DATE_CREATED_PARAM),
          startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate, cb.lessThanOrEqualTo(
          root.<Date>get(AppConstant.PARAM.DATE_CREATED_PARAM),
          endDate));
    }
    return predicate;
  }

}
