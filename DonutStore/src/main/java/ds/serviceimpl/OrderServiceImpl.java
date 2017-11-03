package ds.serviceimpl;

import ds.model.Order;
import ds.repository.OrderRepository;
import ds.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
  @Autowired
  private OrderRepository orderRepository;

  @Override
  public Iterable<Order> findAll() {
    return orderRepository.findAll();
  }

  @Override
  public void save(Order order) {
    orderRepository.save(order);
  }

  @Override
  public void delete(int id) {
    orderRepository.delete(id);
  }

  @Override
  public Order findOne(int id) {
    return orderRepository.findOne(id);
  }

}
