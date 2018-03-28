package ds.upgrade.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ds.upgrade.model.Supply;

public interface SupplyService {

  List<Supply> findAll();

  Supply findOne(Long id);
  
  Page<Supply> findList(Pageable pageable, Boolean enabled);
  
  Supply save(Supply supply);
  
  Supply enabledOrNot(Long id);
  
  Supply findByName(String name);
}
