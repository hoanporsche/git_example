package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.upgrade.model.DiscountType;

public interface DiscountTypeRepository extends JpaRepository<DiscountType, Long> {

}
