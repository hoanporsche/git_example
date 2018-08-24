package ds.upgrade.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Order;
import ds.upgrade.model.support.OrderForm;
import ds.upgrade.model.support.OrderJson;

public interface OrderService {

  Page<Order> findList(Pageable pageable, Long statusId, String storeCode, Boolean shipping,
      Date startDate, Date endDate, String searchString);

  List<OrderJson> findList(String orderCode, String uvresp, HttpServletRequest request);
  
  Order findOne(Long id);
  
  Order createOrUpdate(Order order);
  
  String createNewShipping(OrderForm orderJson, HttpServletRequest request);
}
