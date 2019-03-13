package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Discount;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface DiscountRepository extends JpaRepository<Discount, Long>, JpaSpecificationExecutor<Discount> {

  @Query(QueryConstant.DISCOUNT.FIND_ALL)
  List<Discount> findAll();
  
  Discount findByName(String name);
  
  @Query(QueryConstant.DISCOUNT.FIND_BY_DISCOUNT_TYPE)
  List<Discount> findByCategory(@Param(AppConstant.PARAM.ID_PARAM) Long id);
  
  Discount findBycode(String code);
}
