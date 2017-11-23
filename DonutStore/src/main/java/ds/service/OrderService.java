package ds.service;

import java.util.Date;

import ds.model.Order;

public interface OrderService {
  Iterable<Order> findAll();

  void save(Order order);

  void delete(int id);

  Order findOne(int id);
  
  long countAll();
  
  Iterable<Order> findByDate(Date myDate);
}
