package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.TimekeepingStatus;

public class TimekeepingStatusSpecification implements Specification<TimekeepingStatus> {

  @Override
  public Predicate toPredicate(Root<TimekeepingStatus> arg0, CriteriaQuery<?> arg1,
      CriteriaBuilder arg2) {
    // TODO Auto-generated method stub
    return null;
  }

}
