package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ds.upgrade.model.Quantity;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface QuantityRepository extends JpaRepository<Quantity, String>, JpaSpecificationExecutor<Quantity> {
  @Transactional
  @Modifying
  @Query(QueryConstant.QUANTITY.DELETE_BY_ORDER_CODE)
  void deleteByOrderCode(@Param(AppConstant.PARAM.CODE_PARAM) String code);
}
