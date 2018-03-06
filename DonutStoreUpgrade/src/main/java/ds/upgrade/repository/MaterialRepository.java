package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.Material;

public interface MaterialRepository extends JpaRepository<Material, Long>, JpaSpecificationExecutor<Material> {
}
