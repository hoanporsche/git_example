/**
 * 
 */
package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Category;
import ds.upgrade.util.AppConstants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class CategorySpecification implements Specification<Category> {
  
  private Boolean enabled;
  
  public CategorySpecification() {}
  
  public CategorySpecification(Boolean enabled) {
    this.enabled = enabled;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   * @modifier: User
   * @modifier_date: Mar 6, 2018
   * @param root
   * @param query
   * @param cb
   * @return
   */
  @Override
  public Predicate toPredicate(Root<Category> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstants.PARAM.ENABLED_PARAM), enabled));
    }
    return predicate;
  }

}
