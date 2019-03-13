package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Discount;
import ds.upgrade.model.DiscountType;
import ds.upgrade.model.json.DiscountJson;
import ds.upgrade.repository.DiscountRepository;
import ds.upgrade.repository.DiscountTypeRepository;
import ds.upgrade.repository.specification.DiscountSpecification;
import ds.upgrade.service.DiscountService;
import ds.upgrade.util.service.CommonMethod;

@Service
public class DiscountServiceImpl implements DiscountService {
  @Autowired
  private DiscountRepository discountRepository;
  @Autowired
  private DiscountTypeRepository discountTypeRepository;
  @Autowired
  private CommonMethod commonMethod;

  /**
   * @description: .
   * @author: VØDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<DiscountJson> findAllJson() {
    List<Discount> listFound = discountRepository.findAll();
    List<DiscountJson> listJson = new ArrayList<>();
    if (listFound != null && listFound.size() > 0) {
      for (Discount discount : listFound) {
        listJson.add(new DiscountJson(discount));
      }
      return listJson;
    }
    return null;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public Discount findOne(Long id) {
    return discountRepository.findOne(id);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 26, 2018
   * @modifier: hoan
   * @modifier_date: Mar 26, 2018
   * @param pageable
   * @return
   */
  @Override
  public Page<Discount> findList(Pageable pageable, Boolean enabled, Long discountTypeId) {
    Specification<Discount> spec = new DiscountSpecification(enabled, discountTypeId);
    return discountRepository.findAll(spec, pageable);
  }

  @Override
  public Discount save(Discount discount) {
    DiscountType foundedDiscountType = discountTypeRepository.findOne(discount.getId());
    if (foundedDiscountType == null) return null;
    if (discount.getId() == null) {
      discount.setDateCreated(new Date());
      discount.setCode(commonMethod.createDiscountCode(discountRepository.count() + 1));
    } else {
      Discount foundDiscount = discountRepository.findOne(discount.getId());
      if (foundDiscount == null)
        return null;
      discount.setDateCreated(foundDiscount.getDateCreated());
      discount.setCode(foundDiscount.getCode());
    }
    discount.setDateUpdated(new Date());
    discount.setEnabled(true);
    return discountRepository.save(discount);
  }

  @Override
  public Discount enabledOrNot(Long id) {
    Discount foundDiscount = discountRepository.findOne(id);
    if (foundDiscount == null)
      return null;
    foundDiscount.setDateUpdated(new Date());
    foundDiscount.setEnabled(!foundDiscount.isEnabled());
    discountRepository.save(foundDiscount);
    return foundDiscount;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param name
   * @return
   */
  @Override
  public Discount findByName(String name) {
    return discountRepository.findByName(name);
  }

  @Override
  public List<Discount> findAll() {
    return discountRepository.findAll();
  }
}
