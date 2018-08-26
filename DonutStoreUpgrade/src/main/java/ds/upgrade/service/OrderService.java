package ds.upgrade.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Order;
import ds.upgrade.model.Store;
import ds.upgrade.model.form.OrderFormPrivate;
import ds.upgrade.model.form.OrderFormPublic;
import ds.upgrade.model.json.OrderJson;

public interface OrderService {

  Page<Order> findList(Pageable pageable, Long statusId, String storeCode, Boolean shipping,
      Date startDate, Date endDate, String searchString);

  List<OrderJson> findList(String orderCode, String uvresp, HttpServletRequest request);
  
  Order findOne(String code);
  
  Boolean createOrUpdate(OrderFormPrivate orderForm, Store userStore);
  
  String createNewShipping(OrderFormPublic orderForm, HttpServletRequest request);
  
  Boolean changeStatus(String orderCode, Long statusId);
}
