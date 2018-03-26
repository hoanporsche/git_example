package ds.upgrade.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ds.upgrade.model.OrderStatus;
import ds.upgrade.repository.OrderStatusRepository;
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

}
