package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.upgrade.model.MaterialReport;

public interface MaterialReportRepository extends JpaRepository<MaterialReport, Long> {

}
