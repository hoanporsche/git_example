package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Order;

public interface OrderService {

  List<Order> findAll();

  Order findOne(Long id);
}
