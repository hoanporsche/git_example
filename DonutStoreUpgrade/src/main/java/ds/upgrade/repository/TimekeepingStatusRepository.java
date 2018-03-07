package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.TimekeepingStatus;

public interface TimekeepingStatusRepository extends JpaRepository<TimekeepingStatus, Long>, JpaSpecificationExecutor<TimekeepingStatus> {

}
