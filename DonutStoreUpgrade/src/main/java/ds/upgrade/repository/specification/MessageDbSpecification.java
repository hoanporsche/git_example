package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.MessageDb;
import ds.upgrade.util.AppConstants;

public class MessageDbSpecification implements Specification<MessageDb> {

  private String roomName;
  private String senderPhone;

  public MessageDbSpecification() {
  }

  public MessageDbSpecification(String roomName, String senderPhone) {
    this.roomName = roomName;
    this.senderPhone = senderPhone;
  }

  @Override
  public Predicate toPredicate(Root<MessageDb> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (roomName != null) {
      predicate = cb.and(predicate, cb.equal(
          root.<String>get(AppConstants.PARAM.ROOM_DB_ID_PARAM).get(AppConstants.PARAM.NAME_PARAM),
          roomName));
    }
    if (senderPhone != null) {
      predicate = cb.and(predicate, cb.equal(root.<String>get(AppConstants.PARAM.SENDER_DB_ID_PARAM)
          .get(AppConstants.PARAM.PHONE_PARAM), senderPhone));
    }
    return predicate;
  }

}
