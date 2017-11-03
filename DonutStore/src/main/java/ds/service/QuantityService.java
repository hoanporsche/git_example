package ds.service;

import ds.model.Quantity;

public interface QuantityService {
  Iterable<Quantity> findAll();

  void save(Quantity quantity);

  void delete(int id);

  Quantity findOne(int id);
}
