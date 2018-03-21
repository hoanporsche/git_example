package ds.upgrade.service;

import java.util.List;

import ds.upgrade.model.Supply;

public interface SupplyService {

  List<Supply> findAll();

  Supply findOne(Long id);
}
