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

import ds.upgrade.model.Order;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class OrderSpecification implements Specification<Order> {

  private Long statusId;
  private Long storeId;
  private Boolean isShipping;
  private Date startDate;
  private Date endDate;

  public OrderSpecification() {
    // TODO Auto-generated constructor stub
  }

  public OrderSpecification(Long statusId, Long storeId, Boolean isShipping, Date startDate,
      Date endDate) {
    this.statusId = statusId;
    this.storeId = storeId;
    this.isShipping = isShipping;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   * @modifier: User
   * @modifier_date: Mar 6, 2018
   * @param arg0
   * @param arg1
   * @param arg2
   * @return
   */
  @Override
  public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (storeId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.STORE_ID_PARAM).get(Constants.PARAM.ID_PARAM), storeId));
    }
    if (statusId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.STATUS_ID_PARAM).get(Constants.PARAM.ID_PARAM), statusId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate,
          cb.greaterThanOrEqualTo(root.<Date>get(Constants.PARAM.DATE_CREATED_PARAM), startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate,
          cb.lessThanOrEqualTo(root.<Date>get(Constants.PARAM.DATE_CREATED_PARAM), endDate));
    }
    if (isShipping != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(Constants.PARAM.IS_SHIPPING_PARAM), isShipping));
    }
    return predicate;
  }

}
