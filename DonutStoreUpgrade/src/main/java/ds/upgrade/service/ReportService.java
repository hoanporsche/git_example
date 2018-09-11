package ds.upgrade.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Order;
import ds.upgrade.model.json.OrderReportJson;

public interface ReportService {

  OrderReportJson countingInfomation(String storeCode, Date startDate, Date endDate, String rangeTime);
  
  Page<Order> findListOrder(String storeCode, Date startDate, Date endDate, String rangeTime, Pageable pageable);
}
