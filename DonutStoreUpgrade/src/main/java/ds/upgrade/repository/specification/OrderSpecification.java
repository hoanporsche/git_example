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
import ds.upgrade.util.AppConstant;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class OrderSpecification implements Specification<Order> {

  private Long statusId;
  private String storeCode;
  private Boolean shipping;
  private Date startDate;
  private Date endDate;
  private String orderCode;
  private String orderPhone;

  //find today list by phone
  public OrderSpecification(Date startDate, Date endDate, String orderPhone) {
    super();
    this.startDate = startDate;
    this.endDate = endDate;
    this.orderPhone = orderPhone;
  }

  //find today list by code
  public OrderSpecification(String orderCode, Date startDate, Date endDate) {
    super();
    this.startDate = startDate;
    this.endDate = endDate;
    this.orderCode = orderCode;
  }

  public OrderSpecification() {
  }

  public OrderSpecification(Long statusId, String storeCode, Boolean shipping, Date startDate,
      Date endDate) {
    this.statusId = statusId;
    this.storeCode = storeCode;
    this.shipping = shipping;
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
    if (storeCode != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<String>get(AppConstant.PARAM.STORE_ID_PARAM).get(AppConstant.PARAM.CODE_PARAM), storeCode));
    }
    if (statusId != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Long>get(AppConstant.PARAM.STATUS_ID_PARAM).get(AppConstant.PARAM.ID_PARAM), statusId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate,
          cb.greaterThanOrEqualTo(root.<Date>get(AppConstant.PARAM.DATE_CREATED_PARAM), startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate,
          cb.lessThanOrEqualTo(root.<Date>get(AppConstant.PARAM.DATE_CREATED_PARAM), endDate));
    }
    if (shipping != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstant.PARAM.SHIPPING_PARAM), shipping));
    }
    if (orderCode != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<String>get(AppConstant.PARAM.CODE_PARAM), orderCode));
    }
    if (orderPhone != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<String>get(AppConstant.PARAM.PHONE_PARAM), orderPhone));
    }
    return predicate;
  }

}
