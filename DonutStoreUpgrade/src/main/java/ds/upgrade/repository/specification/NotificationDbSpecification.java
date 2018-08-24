package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.NotificationDb;
import ds.upgrade.util.AppConstant;

public class NotificationDbSpecification implements Specification<NotificationDb> {
  
  private String email;
  
  private Boolean enabledUser;
  
  public NotificationDbSpecification(String email) {
    this.email = email;
    this.enabledUser = true;
  }
  
  public NotificationDbSpecification(String email, boolean enabledUser) {
    this.email = email;
    this.enabledUser = enabledUser;
  }

  @Override
  public Predicate toPredicate(Root<NotificationDb> root, CriteriaQuery<?> cq,
      CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (email != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<String>get(AppConstant.PARAM.USER_ID_PARAM).get(AppConstant.PARAM.EMAIL_PARAM), email));
    }
    if (enabledUser != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<Boolean>get(AppConstant.PARAM.USER_ID_PARAM).get(AppConstant.PARAM.ENABLED_PARAM), true));
    }
    return predicate;
  }

}
