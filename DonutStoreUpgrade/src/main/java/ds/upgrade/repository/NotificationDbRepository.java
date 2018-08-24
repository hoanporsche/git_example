package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ds.upgrade.model.NotificationDb;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.QueryConstant;

public interface NotificationDbRepository
    extends JpaRepository<NotificationDb, Long>, JpaSpecificationExecutor<NotificationDb> {

  @Query(QueryConstant.NOTIFICATION_DB.COUNT_NOT_SEEN_NOTI)
  Integer countNotSeenNoti(@Param(AppConstant.PARAM.ID_PARAM) long userId);
}
