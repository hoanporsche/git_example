package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.OrderStatus;

public interface OrderStatusService {

  List<OrderStatus> findAll();

  OrderStatus findOne(Long id);
}
