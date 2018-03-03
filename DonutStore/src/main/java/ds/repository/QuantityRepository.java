package ds.repository;

import ds.model.Quantity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuantityRepository extends JpaRepository<Quantity, Integer> {

}
