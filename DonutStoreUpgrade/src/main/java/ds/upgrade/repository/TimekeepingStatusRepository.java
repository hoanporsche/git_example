package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.TimekeepingStatus;

public interface TimekeepingStatusRepository extends JpaRepository<TimekeepingStatus, Long>, JpaSpecificationExecutor<TimekeepingStatus> {

  @Query("SELECT ts FROM TimekeepingStatus ts WHERE ts.enabled = true")
  List<TimekeepingStatus> findAll();
}
