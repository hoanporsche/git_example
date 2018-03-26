package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.WorkingCalender;

public interface WorkingCalenderRepository
    extends JpaRepository<WorkingCalender, Long>, JpaSpecificationExecutor<WorkingCalender> {

  @Query("SELECT wc FROM WorkingCalender wc WHERE wc.enabled = true")
  List<WorkingCalender> findAll();
}
