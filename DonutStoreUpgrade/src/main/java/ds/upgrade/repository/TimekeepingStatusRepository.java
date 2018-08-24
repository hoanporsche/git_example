package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.TimekeepingStatus;
import ds.upgrade.util.QueryConstant;

public interface TimekeepingStatusRepository extends JpaRepository<TimekeepingStatus, Long>, JpaSpecificationExecutor<TimekeepingStatus> {

  @Query(QueryConstant.TIMEKEEPING_STATUS.FIND_ALL)
  List<TimekeepingStatus> findAll();
  
  TimekeepingStatus findByName(String name);
}
