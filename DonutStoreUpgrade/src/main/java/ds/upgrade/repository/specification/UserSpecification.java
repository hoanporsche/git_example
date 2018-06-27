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

import ds.upgrade.model.User;
import ds.upgrade.util.AppConstant;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class UserSpecification implements Specification<User> {

  private Long storeId;
  private Date startDate;
  private Date endDate;
  private Long roleId;

  public UserSpecification(Long storeId, Date startDate, Date endDate, Long roleId) {
    this.storeId = storeId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.roleId = roleId;
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
  public Predicate toPredicate(Root<User> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (storeId != null) {
      predicate = cb.and(predicate, cb.equal(root.<Long>get(AppConstant.PARAM.STORE_ID_PARAM).get(AppConstant.PARAM.ID_PARAM), storeId));
    }
    if (startDate != null) {
      predicate = cb.and(predicate,
          cb.greaterThanOrEqualTo(root.<Date>get(AppConstant.PARAM.DATE_CREATED_PARAM), startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate,
          cb.lessThanOrEqualTo(root.<Date>get(AppConstant.PARAM.DATE_CREATED_PARAM), endDate));
    }
    if (roleId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.join(AppConstant.PARAM.ROLES_PARAM).get(AppConstant.PARAM.ID_PARAM), roleId));
    }
    return predicate;
  }

}
