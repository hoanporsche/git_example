package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Quantity;

public interface QuantityRepository extends JpaRepository<Quantity, Long>, JpaSpecificationExecutor<Quantity> {

}
