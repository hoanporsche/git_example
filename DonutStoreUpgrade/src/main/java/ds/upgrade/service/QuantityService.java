package ds.upgrade.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Quantity;

public interface QuantityService {

  Page<Quantity> findList(Pageable pageable, Long storeId, Long itemId, Date startDate,
      Date endDate, Boolean isShipping);

  Quantity findOne(Long id);
}
