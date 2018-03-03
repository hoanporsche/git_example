package ds.service.impl;

import ds.model.Order;
import ds.repository.OrderRepository;
import ds.service.OrderService;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  public Iterable<Order> findAll() {
    return orderRepository.findAll();
  }

  @Override
  public void save(Order order) {
    orderRepository.save(order);
  }

  @Override
  public void delete(int id) {
    orderRepository.delete(id);
  }

  @Override
  public Order findOne(int id) {
    return orderRepository.findOne(id);
  }

  @Override
  public long countAll() {
    return orderRepository.count();
  }

  @Override
  public Iterable<Order> findByDate(Date myDate) {
    StringBuilder sql = new StringBuilder(
        "select * from orders where order_date_created = " + myDate);
    List<Order> listOrder = new ArrayList<>();
    listOrder = jdbcTemplate.query(sql.toString(), new RowMapper<Order>() {
      public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
        Order o = new Order();
        o.setOrderId(rs.getInt("order_id"));
        return o;
      }
    });
    return listOrder;
  }

}
