package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.util.AppConstants;

public class OrderStatusSpecification implements Specification<OrderStatus> {

  private Boolean enabled;

  public OrderStatusSpecification() {}

  public OrderStatusSpecification(Boolean enabled) {
    this.enabled = enabled;
  }

  @Override
  public Predicate toPredicate(Root<OrderStatus> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstants.PARAM.ENABLED_PARAM), enabled));
    }
    return predicate;
  }

}
