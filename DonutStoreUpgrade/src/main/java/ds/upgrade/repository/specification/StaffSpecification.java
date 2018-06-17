/**
 * 
 */
package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Staff;
import ds.upgrade.util.AppConstants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class StaffSpecification implements Specification<Staff> {

  private Boolean enabled;
  private Long storeId;
  private Long workingCalenderId;

  public StaffSpecification() {}

  public StaffSpecification(Boolean enabled, Long storeId, Long workingCalenderId) {
    this.enabled = enabled;
    this.storeId = storeId;
    this.workingCalenderId = workingCalenderId;
  }

  @Override
  public Predicate toPredicate(Root<Staff> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstants.PARAM.ENABLED_PARAM), enabled));
    }
    if (storeId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Long>get(AppConstants.PARAM.STORE_ID_PARAM).get(AppConstants.PARAM.ID_PARAM), storeId));
    }
    if (workingCalenderId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Long>get(AppConstants.PARAM.WORKING_CALENDER_ID_PARAM).get(AppConstants.PARAM.ID_PARAM), workingCalenderId));
    }
    return predicate;
  }

}
