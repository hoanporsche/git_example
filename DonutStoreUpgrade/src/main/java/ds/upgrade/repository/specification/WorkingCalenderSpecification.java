package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.WorkingCalender;

public class WorkingCalenderSpecification implements Specification<WorkingCalender> {

  @Override
  public Predicate toPredicate(Root<WorkingCalender> arg0, CriteriaQuery<?> arg1,
      CriteriaBuilder arg2) {
    // TODO Auto-generated method stub
    return null;
  }

}
