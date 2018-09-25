package ds.upgrade.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ds.upgrade.model.Quantity;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface QuantityRepository
    extends JpaRepository<Quantity, String>, JpaSpecificationExecutor<Quantity> {
  @Transactional
  @Modifying
  @Query(QueryConstant.QUANTITY.DELETE_BY_ORDER_CODE)
  void deleteByOrderCode(@Param(AppConstant.PARAM.CODE_PARAM) String code);

  @Query("SELECT count(q.quantity) FROM Quantity q WHERE q.orderCode.dateCreated <= :endDate AND q.itemId.id = :itemId AND ((:startDate IS NULL AND q.orderCode.dateCreated IS NOT NULL) OR q.orderCode.dateCreated >= :startDate)")
  int countQuantityForCountingInfo(@Param("startDate") Date startDate,
      @Param("endDate") Date endDate, @Param("itemId") Long itemId);
}
