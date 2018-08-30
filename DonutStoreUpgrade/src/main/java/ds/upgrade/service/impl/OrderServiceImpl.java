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
import ds.upgrade.model.form.OrderFormPrivate;
import ds.upgrade.model.form.OrderFormPublic;
import ds.upgrade.model.form.QuantityForm;
import ds.upgrade.model.json.OrderJson;
import ds.upgrade.repository.ItemRepository;
import ds.upgrade.repository.OrderRepository;
import ds.upgrade.repository.StoreRepository;
import ds.upgrade.repository.specification.OrderSpecification;
import ds.upgrade.service.NotificationDbService;
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
	@Autowired
	private NotificationDbService notificationDbService;

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
	public Order findOne(String code) {
		Order order = orderRepository.findBycode(code);
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
	public Page<Order> findList(Pageable pageable, Long statusId, String storeCode, Boolean shipping, Date startDate,
			Date endDate, String searchString) {
		Specification<Order> spec = new OrderSpecification(statusId, storeCode, shipping, startDate, endDate);
		if (customValidation.isPhoneNumber(searchString)) {
			spec = new OrderSpecification(statusId, storeCode, shipping, startDate, endDate, searchString);
		} else {
			spec = new OrderSpecification(searchString, statusId, storeCode, shipping, startDate, endDate);
		}
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
	public Boolean createOrUpdate(OrderFormPrivate orderForm, Store userStore) {
		Order order = new Order();
		Date newDate = new Date();
		if (orderForm.getCode() == null) {
			order.setCode(commonMethod.createOrderCode(newDate));
			order.setDateCreated(newDate);
			order.setStatusId(new OrderStatus(2L));
		} else {
			Order foundOrder = orderRepository.findBycode(orderForm.getCode());
			if (foundOrder == null)
				return Boolean.FALSE;
			order.setCode(foundOrder.getCode());
			order.setDateCreated(foundOrder.getDateCreated());
			Long foundStatusId = foundOrder.getStatusId().getId();
			if (foundStatusId == 5 || (orderForm.isShipping() && (foundStatusId == 3 || foundStatusId == 4))
					|| (!orderForm.isShipping() && (foundOrder.getStatusId().getId() == 4)))
				return Boolean.FALSE;
			/**
			 * Chuyển trạng thái từ đang xác thực thành đã nhận nếu đơn hàng đó đang có status là 1, kèm
			 * theo việc đc chuyển shipping từ giao đi thành đến nhận
			 */
			if (foundStatusId == 1 && foundOrder.isShipping() != order.isShipping()) {
			  order.setStatusId(new OrderStatus(2L));
			} else {
				order.setStatusId(foundOrder.getStatusId());
			}
			quantityService.deleteByOrderCode(foundOrder.getCode());
		}
		order.setDateUpdated(newDate);
		order.setNameCreated(orderForm.getNameCreated().trim());
		order.setPhone(orderForm.getPhone().trim());
		order.setStoreId(userStore.getId());
		order.setShipping(orderForm.isShipping());
		String addressShipping = (orderForm.getAddressShipping() == null) ? "" : orderForm.getAddressShipping().trim();
		order.setAddressShipping(addressShipping);
		String distance = (orderForm.getDistance() == null) ? "" : orderForm.getDistance().trim();
		order.setDistance(distance);
		order.setShippingPrice(orderForm.getShippingPrice());
		order.setTotalPrice(orderForm.getTotalPrice());

		List<Quantity> listQuantity = new ArrayList<>();
		List<QuantityForm> list = orderForm.getQuantities();
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
			return Boolean.FALSE;
		Boolean success = quantityService.saveList(listQuantity);
		if (!success)
			return Boolean.FALSE;
		return Boolean.TRUE;
	}

	/**
	 * @description: save order. Kiểm tra có tồn tại store không, kiểm tra có tồn
	 *               tại các item có tồn tại k kiểm tra save order có thành công
	 *               không, kiểm tra các quantity có lưu thành công không.
	 * @author: VDHoan
	 * @created_date: Aug 22, 2018
	 * @param orderForm
	 * @param request
	 * @return nếu tất cả thành công thì trả về code của order, ngược lại trả ra
	 *         null
	 */
	@Override
	public String createNewShipping(OrderFormPublic orderForm, HttpServletRequest request) {
		Order order = new Order();
		if (capchaService.checkCapcha(orderForm.getUvresp(), request)) {
			Date newDate = new Date();
			order.setCode(commonMethod.createOrderCode(newDate));
			order.setDateCreated(newDate);
			order.setDateUpdated(newDate);
			order.setNameCreated(orderForm.getNameCreated().trim());
			order.setPhone(orderForm.getPhone().trim());

			Store foundStore = storeRepository.findBycode(orderForm.getStoreCode());
			if (foundStore == null || !foundStore.isEnabled())
				return null;
			order.setStoreId(foundStore.getId());

			order.setStatusId(new OrderStatus(1L));
			order.setShipping(true);
			order.setAddressShipping(orderForm.getAddressShipping().trim());
			order.setDistance(orderForm.getDistance().trim());
			order.setShippingPrice(orderForm.getShippingPrice());
			order.setTotalPrice(orderForm.getTotalPrice());

			List<Quantity> listQuantity = new ArrayList<>();
			List<QuantityForm> list = orderForm.getQuantities();
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
		notificationDbService.pushNewOrderToUser(order);
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
					list.add(new OrderJson(order, storeRepository.findOne(order.getStoreId()).getName()));
				});
			} else {
				Specification<Order> spec = new OrderSpecification(orderCode, startDate, endDate);
				orderRepository.findAll(spec).forEach(order -> {
					list.add(new OrderJson(order,storeRepository.findOne(order.getStoreId()).getName()));
				});
			}
		}
		return list;
	}

	@Override
	public Boolean changeStatus(String orderCode, Long statusId) {
		Order foundOrder = orderRepository.findBycode(orderCode);
		if (customValidation.canUpdateOrderStatus(foundOrder.getStatusId(), statusId)) {
			foundOrder.setStatusId(new OrderStatus(statusId));
			foundOrder.setDateUpdated(new Date());
			orderRepository.save(foundOrder);
			return Boolean.TRUE;
		}
		;
		return Boolean.FALSE;
	}

}
