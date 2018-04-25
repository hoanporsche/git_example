package ds.upgrade.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Order;

public interface OrderService {

  Page<Order> findList(Pageable pageable, Long statusId, Long storeId, Boolean isShipping,
      Date startDate, Date endDate);

  Order findOne(Long id);
  
  Order createOrUpdate(Order order);
}
