package ds.repository;

import ds.model.Material;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
  public Material findBymaterialCode(String code);
}
