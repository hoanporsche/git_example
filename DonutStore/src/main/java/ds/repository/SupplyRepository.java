package ds.repository;

import ds.model.Supply;

import org.springframework.data.repository.CrudRepository;

public interface SupplyRepository extends CrudRepository<Supply, Integer> {

  public Supply findBysupplyCode(String supplyCode);
}
