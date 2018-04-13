package ds.repository;

import ds.model.Material;

import org.springframework.data.repository.CrudRepository;

public interface MaterialRepository extends CrudRepository<Material, Integer> {
  public Material findBymaterialCode(String code);
}
