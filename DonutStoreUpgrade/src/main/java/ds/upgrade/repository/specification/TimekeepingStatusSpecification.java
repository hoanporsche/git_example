package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.TimekeepingStatus;
import ds.upgrade.util.AppConstant;

public class TimekeepingStatusSpecification implements Specification<TimekeepingStatus> {

  private Boolean enabled;

  public TimekeepingStatusSpecification() {}

  public TimekeepingStatusSpecification(Boolean enabled) {
    this.enabled = enabled;
  }

  @Override
  public Predicate toPredicate(Root<TimekeepingStatus> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstant.PARAM.ENABLED_PARAM), enabled));
    }
    return predicate;
  }

}
