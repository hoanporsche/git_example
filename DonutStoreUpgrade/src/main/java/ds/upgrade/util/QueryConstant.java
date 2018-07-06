package ds.upgrade.util;

public class QueryConstant {

  public static class CATEGORY {
    public static final String FIND_ALL = "SELECT c FROM Category c WHERE c.enabled = true";
  }

  public static class ITEM {
    public static final String FIND_ALL = "SELECT i FROM Item i WHERE i.enabled = true";
    public static final String FIND_BY_CATEGORY = "SELECT i FROM Item i WHERE i.categoryId.id = :id";
  }

  public static class MATERIAL_DAILY_REPORT {
    public static final String FIND_DAILY_REPORT = "SELECT mdr FROM MaterialDailyReport mdr WHERE CONVERT(mdr.dateCreated, DATE) = :dateCreated AND mdr.storeId.name = :name ";
  }

  public static class MATERIAL {
    public static final String FIND_ALL = "SELECT m FROM Material m WHERE m.enabled = true";
    public static final String FIND_BY_SUPPLY = "SELECT m FROM Material m WHERE m.supplyId.id = :id";
  }

  public static class MESSAGE_DB {

  }

  public static class NOTIFICATION_DB {
    public static final String COUNT_NOT_SEEN_NOTI = "SELECT COUNT(*) FROM NotificationDb WHERE userId.id = :id AND seen = false";
  }

  public static class ORDER {

  }

  public static class ORDER_STATUS {
    public static final String FIND_ALL = "SELECT os FROM OrderStatus os WHERE os.enabled = true";
  }

  public static class QUANTITY {

  }

  public static class ROLE {
    public static final String FIND_ALL = "SELECT r FROM Role r WHERE r.enabled = true";
  }

  public static class ROOM_DB {

  }

  public static class SENDER_DB {
    public static final String FIND_ALL_INTERNAL = "SELECT sd FROM SenderDb sd WHERE sd.userId != null";
  }

  public static class STAFF {
    public static final String FIND_ALL = "SELECT s FROM Staff s WHERE s.enabled = true";
    public static final String FIND_BY_STORE = "SELECT s FROM Staff s WHERE s.storeId.id = :id";
  }

  public static class SUPPLY {
    public static final String FIND_ALL = "SELECT s FROM Supply s WHERE s.enabled = true";
  }

  public static class TIMEKEEPING {

  }

  public static class TIMEKEEPING_STATUS {
    public static final String FIND_ALL = "SELECT ts FROM TimekeepingStatus ts WHERE ts.enabled = true";
  }

  public static class USER {
    public static final String FIND_BY_ENABLED_EMAIL = "SELECT u FROM User u WHERE u.email = :email AND u.enabled = true";
    public static final String FIND_BY_ENABLED_PHONE = "SELECT u FROM User u WHERE u.storeId.phone = :phone AND u.enabled = true";
    public static final String FIND_ALL = "SELECt u FROM User u WHERE u.enabled = true";
  }
  
  public static class WORKING_CALENDER {
    public static final String FIND_ALL = "SELECT wc FROM WorkingCalender wc WHERE wc.enabled = true";
  }
}
