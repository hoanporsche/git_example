/**
 * 
 */
package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Item;
import ds.upgrade.util.AppConstant;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class ItemSpecification implements Specification<Item> {

  private Boolean enabled;
  private Long materialId;
  private Long categoryId;
  
  public ItemSpecification() {}
  
  public ItemSpecification(Boolean enabled, Long materialId, Long categoryId) {
    this.enabled = enabled;
    this.materialId = materialId;
    this.categoryId = categoryId;
  }
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   * @modifier: User
   * @modifier_date: Mar 6, 2018
   * @param arg0
   * @param arg1
   * @param arg2
   * @return
   */
  @Override
  public Predicate toPredicate(Root<Item> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstant.PARAM.ENABLED_PARAM), enabled));
    }
    if (materialId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.join(AppConstant.PARAM.MATERIALS_PARAM).<Long>get(AppConstant.PARAM.ID_PARAM), materialId));
    }
    if (categoryId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Long>get(AppConstant.PARAM.CATEGORY_ID_PARAM).get(AppConstant.PARAM.ID_PARAM), categoryId));
    }
    return predicate;
  }

}
