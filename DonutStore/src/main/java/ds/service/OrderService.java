package ds.service;

import ds.model.Order;

import java.util.Date;

public interface OrderService {
  Iterable<Order> findAll();

  void save(Order order);

  void delete(int id);

  Order findOne(int id);
  
  long countAll();
  
  Iterable<Order> findByDate(Date myDate);
}
