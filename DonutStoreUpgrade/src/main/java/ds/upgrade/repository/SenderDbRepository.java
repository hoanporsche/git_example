package ds.upgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.upgrade.model.SenderDb;

public interface SenderDbRepository extends JpaRepository<SenderDb, Long> {

  public SenderDb findByPhone(String phone);
}
