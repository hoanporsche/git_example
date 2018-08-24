package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.util.QueryConstant;

public interface OrderStatusRepository
    extends JpaRepository<OrderStatus, Long>, JpaSpecificationExecutor<OrderStatus> {

  @Query(QueryConstant.ORDER_STATUS.FIND_ALL)
  List<OrderStatus> findAll();
  
  OrderStatus findByName(String name);
}
