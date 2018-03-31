package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.OrderStatus;

public interface OrderStatusService {

  List<OrderStatus> findAll();

  OrderStatus findOne(Long id);
  
  Page<OrderStatus> findList(Pageable pageable, Boolean enabled);
  
  OrderStatus save(OrderStatus orderStatus);
  
  OrderStatus enabledOrNot(Long id);
  
  OrderStatus findByName(String name);
}
