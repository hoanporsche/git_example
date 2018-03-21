package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Quantity;

public interface QuantityService {

  List<Quantity> findAll();

  Quantity findOne(Long id);
}
