/**
 * 
 */
package ds.upgrade.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import ds.upgrade.model.Quantity;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
public class QuantitySpecification implements Specification<Quantity> {

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
  public Predicate toPredicate(Root<Quantity> arg0, CriteriaQuery<?> arg1, CriteriaBuilder arg2) {
    // TODO Auto-generated method stub
    return null;
  }

}
