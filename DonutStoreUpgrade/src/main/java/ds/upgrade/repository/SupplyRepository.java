package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Supply;

public interface SupplyRepository extends JpaRepository<Supply, Long>, JpaSpecificationExecutor<Supply> {

}
