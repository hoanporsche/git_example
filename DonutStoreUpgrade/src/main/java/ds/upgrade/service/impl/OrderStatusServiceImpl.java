package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.repository.OrderStatusRepository;
import ds.upgrade.repository.specification.OrderStatusSpecification;
import ds.upgrade.service.OrderStatusService;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

  @Autowired
  private OrderStatusRepository orderStatusRepository;
  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @Override
  public List<OrderStatus> findAll() {
    return orderStatusRepository.findAll();
  }

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
  public OrderStatus findOne(Long id) {
    return orderStatusRepository.findOne(id);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param pageable
   * @param enabled
   * @return
   */
  @Override
  public Page<OrderStatus> findList(Pageable pageable, Boolean enabled) {
    Specification<OrderStatus> spec = new OrderStatusSpecification(enabled);
    return orderStatusRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param orderStatus
   * @return
   */
  @Override
  public OrderStatus save(OrderStatus orderStatus) {
    orderStatus.setEnabled(true);
    return orderStatusRepository.save(orderStatus);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param id
   * @return
   */
  @Override
  public OrderStatus enabledOrNot(Long id) {
    OrderStatus foundOrderStatus = orderStatusRepository.findOne(id);
    if (foundOrderStatus == null)
      return null;
    foundOrderStatus.setEnabled(!foundOrderStatus.isEnabled());
    return orderStatusRepository.save(foundOrderStatus);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 28, 2018
   * @modifier: hoan
   * @modifier_date: Mar 28, 2018
   * @param name
   * @return
   */
  @Override
  public OrderStatus findByName(String name) {
    return orderStatusRepository.findByName(name);
  }

}
