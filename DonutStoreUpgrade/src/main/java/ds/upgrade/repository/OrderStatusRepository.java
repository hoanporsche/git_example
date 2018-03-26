package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.OrderStatus;

public interface OrderStatusRepository
    extends JpaRepository<OrderStatus, Long>, JpaSpecificationExecutor<OrderStatus> {

  @Query("SELECT os FROM OrderStatus os WHERE os.enabled = true")
  List<OrderStatus> findAll();
}
