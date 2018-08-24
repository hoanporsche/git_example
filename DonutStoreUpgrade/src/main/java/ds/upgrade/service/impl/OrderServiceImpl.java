package ds.upgrade.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Item;
import ds.upgrade.model.Order;
import ds.upgrade.model.OrderStatus;
import ds.upgrade.model.Quantity;
import ds.upgrade.model.Store;
import ds.upgrade.model.support.OrderForm;
import ds.upgrade.model.support.OrderJson;
import ds.upgrade.model.support.QuantityForm;
import ds.upgrade.repository.ItemRepository;
import ds.upgrade.repository.OrderRepository;
import ds.upgrade.repository.StoreRepository;
import ds.upgrade.repository.specification.OrderSpecification;
import ds.upgrade.service.OrderService;
import ds.upgrade.service.QuantityService;
import ds.upgrade.util.service.CapchaService;
import ds.upgrade.util.service.CommonMethod;
import ds.upgrade.util.service.CustomValidation;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  private OrderRepository orderRepository;
  @Autowired
  private CapchaService capchaService;
  @Autowired
  private CommonMethod commonMethod;
  @Autowired
  private StoreRepository storeRepository;
  @Autowired
  private ItemRepository itemRepository;
  @Autowired
  private QuantityService quantityService;
  @Autowired
  private CustomValidation customValidation;

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
  public Order findOne(Long id) {
    Order order = orderRepository.findOne(id);
    if (order == null)
      return null;
    return order;
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
    Specification<Order> spec = new OrderSpecification(statusId, storeId, isShipping, startDate,
        endDate);
    return orderRepository.findAll(spec, pageable);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 23, 2018
   * @modifier: hoan
   * @modifier_date: Apr 23, 2018
   * @param order
   * @return
   */
  @Override
  public Order createOrUpdate(Order order) {
    // TODO Auto-generated method stub
    return null;
  }

  /**
   * @description: save order. Kiểm tra có tồn tại store không, kiểm tra có tồn
   *               tại các item có tồn tại k kiểm tra save order có thành công
   *               không, kiểm tra các quantity có lưu thành công không.
   * @author: VDHoan
   * @created_date: Aug 22, 2018
   * @param orderJson
   * @param request
   * @return nếu tất cả thành công thì trả về code của order, ngược lại trả ra
   *         null
   */
  @Override
  public String createNewShipping(OrderForm orderJson, HttpServletRequest request) {
    Order order = new Order();
    if (capchaService.checkCapcha(orderJson.getUvresp(), request)) {
      Date newDate = new Date();
      order.setCode(commonMethod.createOrderCode(newDate));
      order.setDateCreated(newDate);
      order.setDateUpdated(newDate);
      order.setNameCreated(orderJson.getNameCreated().trim());
      order.setPhone(orderJson.getPhone().trim());

      Store foundStore = storeRepository.findBycode(orderJson.getStoreCode());
      if (foundStore == null || !foundStore.isEnabled())
        return null;
      order.setStoreId(foundStore);

      order.setStatusId(new OrderStatus(1L));
      order.setShipping(true);
      order.setAddressShipping(orderJson.getAddressShipping().trim());
      order.setDistance(orderJson.getDistance().trim());
      order.setShippingPrice(orderJson.getShippingPrice());
      order.setTotalPrice(orderJson.getTotalPrice());

      List<Quantity> listQuantity = new ArrayList<>();
      List<QuantityForm> list = orderJson.getQuantities();
      for (int i = 0; i < list.size(); i++) {
        Item foundItem = itemRepository.findBycode(list.get(i).getItem().getCode());
        if (foundItem == null || !foundItem.isEnabled()) {
          return null;
        } else {
          Quantity quantity = new Quantity();
          quantity.setCode(commonMethod.createQuantityCode(order.getCode(), i));
          quantity.setItemId(foundItem);
          quantity.setOrderCode(new Order(order.getCode()));
          quantity.setQuantity(list.get(i).getQuantity());
          listQuantity.add(quantity);
        }
      }

      order = orderRepository.save(order);
      if (order == null)
        return null;
      Boolean success = quantityService.saveList(listQuantity);
      if (!success)
        return null;
    }
    return order.getCode();
  }

  @Override
  public List<OrderJson> findList(String orderCode, String uvresp, HttpServletRequest request) {
    List<OrderJson> list = new ArrayList<>();
    if (capchaService.checkCapcha(uvresp, request)) {
      Date now = new Date();
      Date startDate = commonMethod.createStartDate(now);
      Date endDate = commonMethod.createEndDate(now);
      if (customValidation.isPhoneNumber(orderCode)) {
        Specification<Order> spec = new OrderSpecification(startDate, endDate, orderCode);
        orderRepository.findAll(spec).forEach(order -> {
          list.add(new OrderJson(order));
        });
      } else {
        Specification<Order> spec = new OrderSpecification(orderCode, startDate, endDate);
        orderRepository.findAll(spec).forEach(order -> {
          list.add(new OrderJson(order));
        });
      }
    }
    return list;
  }

}
