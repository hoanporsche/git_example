package ds.repository;

import ds.model.Supply;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplyRepository extends JpaRepository<Supply, Integer> {

  public Supply findBysupplyCode(String supplyCode);
}
