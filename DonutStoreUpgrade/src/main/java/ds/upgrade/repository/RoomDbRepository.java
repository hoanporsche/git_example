package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.upgrade.model.RoomDb;

public interface RoomDbRepository extends JpaRepository<RoomDb, Long> {

  RoomDb findByName(String name);
}
