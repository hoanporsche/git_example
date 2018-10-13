package ds.upgrade.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Order;
import ds.upgrade.model.json.ReportMaterial;
import ds.upgrade.model.json.ReportOrderJson;

public interface ReportService {

  ReportOrderJson countingInfomation(String storeCode, Date startDate, Date endDate, String rangeTime);
  
  Page<Order> findListOrder(String storeCode, Date startDate, Date endDate, String rangeTime, Pageable pageable);
  
  List<ReportMaterial> countingTotalIn(String storeCode, Date startDate, Date endDate);
}