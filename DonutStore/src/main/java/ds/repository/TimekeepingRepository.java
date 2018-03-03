package ds.repository;

import ds.model.Timekeeping;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TimekeepingRepository extends JpaRepository<Timekeeping, Integer> {

}
