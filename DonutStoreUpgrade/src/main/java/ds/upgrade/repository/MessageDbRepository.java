package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.upgrade.model.MessageDb;

public interface MessageDbRepository extends JpaRepository<MessageDb, Long> {

}
