package ds.upgrade.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Order;
import ds.upgrade.model.json.OrderReportJson;
import ds.upgrade.repository.OrderRepository;
import ds.upgrade.repository.specification.OrderSpecification;
import ds.upgrade.service.ReportService;
import ds.upgrade.util.service.CommonMethod;

@Service
public class ReportServiceImpl implements ReportService {

  @Autowired
  private OrderRepository orderRepository;
  @Autowired
  private CommonMethod commonMethod;
  
  @Override
  public OrderReportJson countingInfomation(String storeCode, Date startDate, Date endDate,
      String rangeTime) {
    OrderReportJson orderReportJson = new OrderReportJson();
    if (StringUtils.isEmpty(rangeTime)) {
      orderReportJson = orderRepository.countingInfomation(startDate, endDate, storeCode);
      orderReportJson.setTotalShipping(orderRepository.countingShipping(startDate, endDate, storeCode));
      orderReportJson.setTotalNotShipping(orderRepository.countingNotShipping(startDate, endDate, storeCode));
    } else {
      List<Date> rangeDate = commonMethod.createRangeDateFilter(rangeTime.trim());
      orderReportJson = orderRepository.countingInfomation(rangeDate.get(0), rangeDate.get(1), storeCode);
      orderReportJson.setTotalShipping(orderRepository.countingShipping(rangeDate.get(0), rangeDate.get(1), storeCode));
      orderReportJson.setTotalNotShipping(orderRepository.countingNotShipping(rangeDate.get(0), rangeDate.get(1), storeCode));
    }
    return orderReportJson;
  }

  @Override
  public Page<Order> findListOrder(String storeCode, Date startDate, Date endDate, String rangeTime,
      Pageable pageable) {
    Specification<Order> spec;
    if (StringUtils.isEmpty(rangeTime)) {
      spec = new OrderSpecification(startDate, storeCode, endDate);
    } else {
      List<Date> rangeDate = commonMethod.createRangeDateFilter(rangeTime.trim());
      System.out.println(rangeDate);
      System.out.println(storeCode);
      spec = new OrderSpecification(rangeDate.get(0), storeCode, rangeDate.get(1));
    }
    return orderRepository.findAll(spec, pageable);
  }

}
