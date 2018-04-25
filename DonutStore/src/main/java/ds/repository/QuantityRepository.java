package ds.repository;

import ds.model.Quantity;

import org.springframework.data.repository.CrudRepository;

public interface QuantityRepository extends CrudRepository<Quantity, Integer> {

}
