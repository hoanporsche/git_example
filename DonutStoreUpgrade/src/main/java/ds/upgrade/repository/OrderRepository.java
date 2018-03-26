package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Order;

public interface OrderRepository
    extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

}
