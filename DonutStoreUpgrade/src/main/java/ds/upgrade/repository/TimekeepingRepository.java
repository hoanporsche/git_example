package ds.upgrade.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Timekeeping;

public interface TimekeepingRepository extends JpaRepository<Timekeeping, Long>, JpaSpecificationExecutor<Timekeeping> {

}
