package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.MessageDb;

public interface MessageDbRepository
    extends JpaRepository<MessageDb, Long>, JpaSpecificationExecutor<MessageDb> {

}
