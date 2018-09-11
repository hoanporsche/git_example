package ds.upgrade.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.Order;
import ds.upgrade.model.json.OrderReportJson;

public interface OrderRepository
    extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

  Order findBycode(String code);

  @Query("SELECT new ds.upgrade.model.json.OrderReportJson(count(ord), sum(ord.shippingPrice), sum(ord.totalPrice)) FROM Order ord"
      + " WHERE ord.dateCreated <=:endDate " + "AND ord.storeId.code =:storeCode "
      + "AND ((:startDate IS NULL AND ord.dateCreated IS NOT NULL) or ord.dateCreated >=:startDate)")
  OrderReportJson countingInfomation(@Param("startDate") Date startDate,
      @Param("endDate") Date endDate, @Param("storeCode") String storeCode);
  @Query("SELECT count(ord) FROM Order ord"
      + " WHERE ord.dateCreated <=:endDate " + "AND ord.storeId.code =:storeCode AND ord.shipping = true "
      + "AND ((:startDate IS NULL AND ord.dateCreated IS NOT NULL) or ord.dateCreated >=:startDate)")
  int countingShipping(@Param("startDate") Date startDate,
      @Param("endDate") Date endDate, @Param("storeCode") String storeCode);
  @Query("SELECT count(ord) FROM Order ord"
      + " WHERE ord.dateCreated <=:endDate " + "AND ord.storeId.code =:storeCode AND ord.shipping = false "
      + "AND ((:startDate IS NULL AND ord.dateCreated IS NOT NULL) or ord.dateCreated >=:startDate)")
  int countingNotShipping(@Param("startDate") Date startDate,
      @Param("endDate") Date endDate, @Param("storeCode") String storeCode);
}
