package ds.upgrade.service;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Order;
import ds.upgrade.model.support.OrderJson;

public interface OrderService {

  Page<Order> findList(Pageable pageable, Long statusId, Long storeId, Boolean isShipping,
      Date startDate, Date endDate);

  Order findOne(Long id);
  
  Order createOrUpdate(Order order);
  
  Order create(OrderJson orderJson, HttpServletRequest request);
}
