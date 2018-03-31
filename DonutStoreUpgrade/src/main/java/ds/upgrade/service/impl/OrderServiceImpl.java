package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Order;
import ds.upgrade.repository.OrderRepository;
import ds.upgrade.repository.specification.OrderSpecification;
import ds.upgrade.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  private OrderRepository orderRepository;

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @Override
  public List<Object> findOne(Long id) {
    Order order = orderRepository.findOne(id);
    if (order == null)
      return null;
    List<Object> list = new ArrayList<Object>();
    list.add(order);
    list.add(order.getQuantities());
    return list;
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 31, 2018
   * @modifier: hoan
   * @modifier_date: Mar 31, 2018
   * @param pageable
   * @param statusId
   * @param storeId
   * @param isShipping
   * @param startDate
   * @param endDate
   * @return
   */
  @Override
  public Page<Order> findList(Pageable pageable, Long statusId, Long storeId, Boolean isShipping,
      Date startDate, Date endDate) {
    Specification<Order> spec = new OrderSpecification(statusId, storeId, isShipping, startDate, endDate);
    return orderRepository.findAll(spec, pageable);
  }

}
