/**
 * 
 */
package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Store;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class StoreSpecification implements Specification<Store> {

  private Boolean enabled;
  
  private Long itemId;

  public StoreSpecification() {}
  
  public StoreSpecification(Boolean enabled, Long itemId) {
    this.enabled = enabled;
    this.itemId = itemId;
  }

  @Override
  public Predicate toPredicate(Root<Store> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(Constants.PARAM.ENABLED_PARAM), enabled));
    }
    if (itemId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.join(Constants.PROPERTY.ITEMS_PROPERTY).<Long>get(Constants.PARAM.ID_PARAM), itemId));
    }
    return predicate;
  }

}
