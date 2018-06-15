package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import ds.upgrade.model.NotificationDb;

public interface NotificationDbRepository
    extends JpaRepository<NotificationDb, Long>, JpaSpecificationExecutor<NotificationDb> {

}
