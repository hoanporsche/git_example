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
import ds.upgrade.util.Constants;

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

  public QuantitySpecification() {
  }

  public QuantitySpecification(Long storeId, Long itemId, Date startDate, Date endDate) {
    this.storeId = storeId;
    this.itemId = itemId;
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
  public Predicate toPredicate(Root<Quantity> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (storeId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.ORDER_ID_PARAM).get(Constants.PARAM.STORE_ID_PARAM).get(Constants.PARAM.ID_PARAM), storeId));
    }
    if (itemId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(Constants.PARAM.ITEM_ID_PARAM).get(Constants.PARAM.ID_PARAM), itemId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate,
          cb.greaterThanOrEqualTo(root.<Date>get(Constants.PARAM.ORDER_ID_PARAM).get(Constants.PARAM.DATE_CREATED_PARAM), startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate,
          cb.lessThanOrEqualTo(root.<Date>get(Constants.PARAM.ORDER_ID_PARAM).get(Constants.PARAM.DATE_CREATED_PARAM), endDate));
    }
    return predicate;
  }
}