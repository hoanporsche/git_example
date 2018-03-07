package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.WorkingCalender;

public interface WorkingCalenderRepository
    extends JpaRepository<WorkingCalender, Long>, JpaSpecificationExecutor<WorkingCalender> {

}
