package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Discount;
import ds.upgrade.util.AppConstant;

public class DiscountSpecification implements Specification<Discount> {
  private Boolean enabled;
  private Long discountTypeId;
  
  public DiscountSpecification() {}
  
  public DiscountSpecification(Boolean enabled, Long materialId) {
    this.enabled = enabled;
    this.discountTypeId = materialId;
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
  public Predicate toPredicate(Root<Discount> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
    Predicate predicate = cb.conjunction();
    if (enabled != null) {
      predicate = cb.and(predicate,
          cb.equal(root.<Boolean>get(AppConstant.PARAM.ENABLED_PARAM), enabled));
    }
    if (discountTypeId != null) {
      predicate = cb.and(predicate,
          cb.equal(root.get(AppConstant.PARAM.DISCOUNT_TYPE_ID_PARAM).<Long>get(AppConstant.PARAM.ID_PARAM), discountTypeId));
    }
    return predicate;
  }

}
