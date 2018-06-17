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

import ds.upgrade.model.Quantity;
import ds.upgrade.util.AppConstants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class QuantitySpecification implements Specification<Quantity> {

  private Long storeId;
  private Long itemId;
  private Date startDate;
  private Date endDate;
  private Boolean isShipping;

  public QuantitySpecification() {
  }

  public QuantitySpecification(Long storeId, Long itemId, Date startDate, Date endDate,
      Boolean isShipping) {
    this.storeId = storeId;
    this.itemId = itemId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isShipping = isShipping;
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
  public Predicate toPredicate(Root<Quantity> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (storeId != null) {
      predicate = cb.and(predicate, cb.equal(root.<Long>get(AppConstants.PARAM.ORDER_ID_PARAM)
          .get(AppConstants.PARAM.STORE_ID_PARAM).get(AppConstants.PARAM.ID_PARAM), storeId));
    }
    if (itemId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(AppConstants.PARAM.ITEM_ID_PARAM).get(AppConstants.PARAM.ID_PARAM), itemId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate, cb.greaterThanOrEqualTo(
          root.<Date>get(AppConstants.PARAM.ORDER_ID_PARAM).get(AppConstants.PARAM.DATE_CREATED_PARAM),
          startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate, cb.lessThanOrEqualTo(
          root.<Date>get(AppConstants.PARAM.ORDER_ID_PARAM).get(AppConstants.PARAM.DATE_CREATED_PARAM),
          endDate));
    }
    if (isShipping != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstants.PARAM.ORDER_ID_PARAM).get(AppConstants.PARAM.IS_SHIPPING_PARAM), isShipping));
    }
    return predicate;
  }
}