package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.RoomDb;

public interface RoomDbRepository
    extends JpaRepository<RoomDb, Long>, JpaSpecificationExecutor<RoomDb> {

  RoomDb findByName(String name);
}
