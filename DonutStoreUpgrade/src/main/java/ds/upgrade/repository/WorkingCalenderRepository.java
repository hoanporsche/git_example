package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.WorkingCalender;
import ds.upgrade.util.QueryConstant;

public interface WorkingCalenderRepository
    extends JpaRepository<WorkingCalender, Long>, JpaSpecificationExecutor<WorkingCalender> {

  @Query(QueryConstant.WORKING_CALENDER.FIND_ALL)
  List<WorkingCalender> findAll();
  
  WorkingCalender findByName(String name);
}
