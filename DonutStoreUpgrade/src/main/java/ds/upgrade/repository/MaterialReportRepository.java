package ds.upgrade.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.MaterialReport;

public interface MaterialReportRepository extends JpaRepository<MaterialReport, Long> {

  @Query("SELECT count(mr.in) FROM MaterialReport mr"
      + " WHERE ((:endDate IS NULL AND mr.materialDailyReportId.dateCreated IS NOT NULL) or mr.materialDailyReportId.dateCreated >=:endDate)" + "AND mr.materialDailyReportId.storeId.code =:storeCode AND mr.materialId.id = :materialId "
      + "AND ((:startDate IS NULL AND mr.materialDailyReportId.dateCreated IS NOT NULL) or mr.materialDailyReportId.dateCreated >=:startDate)")
  int countingTotalIn(@Param("startDate") Date startDate,
      @Param("endDate") Date endDate, @Param("storeCode") String storeCode, @Param("materialId") Long materialId);
}
