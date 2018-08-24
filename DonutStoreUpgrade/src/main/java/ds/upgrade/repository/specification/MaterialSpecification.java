/**
 * 
 */
package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Material;
import ds.upgrade.util.AppConstant;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class MaterialSpecification implements Specification<Material> {

  private Boolean enabled;
  
  private Long supplyId;

  public MaterialSpecification() {}
  
  public MaterialSpecification(Boolean enabled, Long supplyId) {
    this.enabled = enabled;
    this.supplyId = supplyId;
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
  public Predicate toPredicate(Root<Material> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstant.PARAM.ENABLED_PARAM), enabled));
    }
    if (supplyId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Long>get(AppConstant.PARAM.SUPPLY_ID_PARAM).get(AppConstant.PARAM.ID_PARAM), supplyId));
    }
    return predicate;
  }

}
