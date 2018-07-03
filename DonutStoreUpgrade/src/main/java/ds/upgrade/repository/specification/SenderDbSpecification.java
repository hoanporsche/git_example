package ds.upgrade.repository.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.SenderDb;
import ds.upgrade.util.AppConstant;

public class SenderDbSpecification implements Specification<SenderDb> {

  private Boolean isInternal;
  private Date startDate;
  private Date endDate;

  public SenderDbSpecification(Boolean isInternal) {
    this.isInternal = isInternal;
  }

  public SenderDbSpecification(Date startDate, Date endDate, Boolean isInternal) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.isInternal = isInternal;
  }

  @Override
  public Predicate toPredicate(Root<SenderDb> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (startDate != null) {
      predicate = cb.and(predicate,
          cb.greaterThanOrEqualTo(root.<Date>get(AppConstant.PARAM.LAST_CONNECT), startDate));
    }
    if (endDate != null) {
      predicate = cb.and(predicate,
          cb.lessThanOrEqualTo(root.<Date>get(AppConstant.PARAM.LAST_CONNECT), endDate));
    }
    if (isInternal.equals(Boolean.TRUE)) {
      predicate = cb.and(predicate, cb.isNotNull(root.get(AppConstant.PARAM.USER_ID_PARAM)));
    }
    if (isInternal.equals(Boolean.FALSE)) {
      predicate = cb.and(predicate, cb.isNull(root.get(AppConstant.PARAM.USER_ID_PARAM)));
    }
    return predicate;
  }

}
