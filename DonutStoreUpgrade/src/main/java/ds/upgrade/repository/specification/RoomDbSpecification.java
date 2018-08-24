package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.RoomDb;
import ds.upgrade.util.AppConstant;

public class RoomDbSpecification implements Specification<RoomDb> {

  private String senderPhone;
  
  public RoomDbSpecification() {};
  
  public RoomDbSpecification(String senderPhone) {
    this.senderPhone = senderPhone;
  }

  @Override
  public Predicate toPredicate(Root<RoomDb> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (senderPhone != null) {
      predicate = cb.and(predicate,
          cb.equal(
              root.join(AppConstant.PARAM.SENDER_DB_S_PARAM).get(AppConstant.PARAM.PHONE_PARAM),
              senderPhone));
    }
    query.distinct(root.get(AppConstant.PARAM.ID_PARAM) != null);
    return predicate;
  }

}
