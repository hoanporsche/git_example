package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Item;
import ds.upgrade.model.Material;
import ds.upgrade.model.Order;
import ds.upgrade.model.json.ReportMaterial;
import ds.upgrade.model.json.ReportOrderJson;
import ds.upgrade.model.json.ReportQuantityJson;
import ds.upgrade.repository.ItemRepository;
import ds.upgrade.repository.MaterialReportRepository;
import ds.upgrade.repository.MaterialRepository;
import ds.upgrade.repository.OrderRepository;
import ds.upgrade.repository.QuantityRepository;
import ds.upgrade.repository.specification.OrderSpecification;
import ds.upgrade.service.ReportService;
import ds.upgrade.util.service.CommonMethod;

@Service
public class ReportServiceImpl implements ReportService {

  @Autowired
  private OrderRepository orderRepository;
  @Autowired
  private CommonMethod commonMethod;
  @Autowired
  private ItemRepository itemRepository;
  @Autowired
  private QuantityRepository quantityRepository;
  @Autowired
  private MaterialRepository materialRepository;
  @Autowired
  private MaterialReportRepository materialReportRepository;
  
  @Override
  public ReportOrderJson countingInfomation(String storeCode, Date startDate, Date endDate,
      String rangeTime) {
    List<Item> listItem = itemRepository.findAll();
    ReportOrderJson orderReportJson = new ReportOrderJson();
    List<ReportQuantityJson> listReportQuantityJson = new ArrayList<>();
    if (StringUtils.isEmpty(rangeTime)) {
      orderReportJson = orderRepository.countingInfomation(startDate, endDate, storeCode);
      orderReportJson.setTotalShipping(orderRepository.countingShipping(startDate, endDate, storeCode));
      orderReportJson.setTotalNotShipping(orderRepository.countingNotShipping(startDate, endDate, storeCode));
      listItem.forEach(i -> {
        ReportQuantityJson rqj = new ReportQuantityJson(i.getName(), quantityRepository.countQuantityForCountingInfo(startDate, endDate, i.getId()));
        listReportQuantityJson.add(rqj);
      });
    } else {
      List<Date> rangeDate = commonMethod.createRangeDateFilter(rangeTime.trim());
      orderReportJson = orderRepository.countingInfomation(rangeDate.get(0), rangeDate.get(1), storeCode);
      orderReportJson.setTotalShipping(orderRepository.countingShipping(rangeDate.get(0), rangeDate.get(1), storeCode));
      orderReportJson.setTotalNotShipping(orderRepository.countingNotShipping(rangeDate.get(0), rangeDate.get(1), storeCode));listItem.forEach(i -> {
        ReportQuantityJson rqj = new ReportQuantityJson(i.getName(), quantityRepository.countQuantityForCountingInfo(rangeDate.get(0), rangeDate.get(1), i.getId()));
        listReportQuantityJson.add(rqj);
      });
    }
    orderReportJson.setReportQuantityJsons(listReportQuantityJson);
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
      spec = new OrderSpecification(rangeDate.get(0), storeCode, rangeDate.get(1));
    }
    return orderRepository.findAll(spec, pageable);
  }

  @Override
  public List<ReportMaterial> countingTotalIn(String storeCode, Date startDate,
      Date endDate) {
    List<Material> listMaterial = materialRepository.findAll();
    List<ReportMaterial> listReport = new ArrayList<>();
    listMaterial.forEach(i -> {
      ReportMaterial rm = new ReportMaterial(i.getName(), materialReportRepository.countingTotalIn(startDate, endDate, storeCode, i.getId()));
      listReport.add(rm);
    });
    return listReport;
  }

}
