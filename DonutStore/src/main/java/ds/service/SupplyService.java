package ds.service;

import ds.model.Supply;

import java.util.List;

public interface SupplyService {

  List<Supply> findAll();
  
  List<Supply> findAllByStatus();
  
  void save(Supply supply);
  
  void hide(Supply supply);
  
  void show(Supply supply);
  
  Supply findBysupplyCode(String supplyCode);
}
