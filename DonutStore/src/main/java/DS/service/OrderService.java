package DS.service;

import DS.model.Order;

public interface OrderService {
	Iterable<Order> findAll();
	void save(Order order);
	void delete(int id);
	Order findOne(int id);
}
