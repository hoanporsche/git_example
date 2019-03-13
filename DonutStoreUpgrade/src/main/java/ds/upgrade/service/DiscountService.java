package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Discount;
import ds.upgrade.model.json.DiscountJson;

public interface DiscountService {
List<DiscountJson> findAllJson();
  
  List<Discount> findAll();
  
  Discount findOne(Long id);
  
  Page<Discount> findList(Pageable pageable, Boolean enabled, Long discountTypeId);
  
  Discount save(Discount category);
  
  Discount enabledOrNot(Long id);
  
  Discount findByName(String name);
}
