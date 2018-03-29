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

import ds.upgrade.model.Timekeeping;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class TimekeepingSpecification implements Specification<Timekeeping> {

  private Long statusId;
  private Long staffId;
  private Long storeId;
  private Date startDate;
  private Date endDate;

  public TimekeepingSpecification(Long statusId, Long staffId, Long storeId, Date startDate,
      Date endDate) {
    this.statusId = statusId;
    this.staffId = staffId;
    this.storeId = storeId;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 29, 2018
   * @modifier: hoan
   * @modifier_date: Mar 29, 2018
   * @param root
   * @param arg1
   * @param cb
   * @return
   */
  @Override
  public Predicate toPredicate(Root<Timekeeping> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (statusId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.STATUS_ID_PARAM).get(Constants.PARAM.ID_PARAM), statusId));
    }
    if (staffId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.STAFF_ID_PARAM).get(Constants.PARAM.ID_PARAM), staffId));
    }
    if (storeId != null) {
      predicate = cb.and(predicate, cb.equal(root.<Long>get(Constants.PARAM.STAFF_ID_PARAM)
          .get(Constants.PARAM.STORE_ID_PARAM).get(Constants.PARAM.ID_PARAM), storeId));
    }
    if (startDate != null) {
      System.out.println(startDate);
      predicate = cb.and(predicate,
          cb.greaterThanOrEqualTo(root.<Date>get(Constants.PARAM.DATE_CREATED_PARAM), startDate));
    }
    if (endDate != null) {
      System.out.println(endDate);
      predicate = cb.and(predicate,
          cb.lessThanOrEqualTo(root.<Date>get(Constants.PARAM.DATE_CREATED_PARAM), endDate));
    }
    return predicate;
  }

}
