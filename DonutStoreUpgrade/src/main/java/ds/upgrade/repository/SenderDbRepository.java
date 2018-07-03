package ds.upgrade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ds.upgrade.model.SenderDb;
import ds.upgrade.util.QueryConstant;

public interface SenderDbRepository
    extends JpaRepository<SenderDb, Long>, JpaSpecificationExecutor<SenderDb> {

  public SenderDb findByPhone(String phone);

  @Query(QueryConstant.SENDER_DB.FIND_ALL_INTERNAL)
  public List<SenderDb> findAllInternal();
}
