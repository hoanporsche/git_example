package DS.repository;

import org.springframework.data.repository.CrudRepository;

import DS.model.Order;

public interface OrderRepository extends CrudRepository<Order, Integer> {

}
