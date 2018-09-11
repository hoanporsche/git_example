/**
 * 
 */
package ds.upgrade.util;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
public class AppConstant {

  public static class REPONSE {
    public static final String NO_CONTENT = "We not found any content";
    public static final String ERROR_UNAUTHORIZE = "You have not permissions";
    public static final String ERROR_SERVER = "Server's not working";
    public static final String WRONG_INPUT = "Wrong input";
    public static final String NOT_RETRIVE_DATA = "Not retrive data";
    public static final String SERVER_ERROR = "Internal Server Error";
    public static final String NOT_SAVE = "Saving content has error";
    public static final String NOT_DISABLED = "Please Make sure you have a replacement";
    public static final String WRONG_OLD_PASSWORD = "Wrong old password";
    public static final String HAVE_NOT_PERMISSION = "You have not permission";
    public static final String ADMIN_CANNOT_EN_DISABLE_HIS_ACCOUNT = "You cannot disable or enable your account";
  }
  
  public static class PARAM {
    public static final String ID_PARAM = "id";
    public static final String ENABLED_PARAM = "enabled";
    public static final String NAME_PARAM = "name";
    public static final String STATUS_ID_PARAM = "statusId";
    public static final String STAFF_ID_PARAM = "staffId";
    public static final String STORE_ID_PARAM = "storeId";
    public static final String STORE_CODE_PARAM = "storeCode";
    public static final String START_DATE_PARAM = "startDate";
    public static final String END_DATE_PARAM = "endDate";
    public static final String DATE_CREATED_PARAM = "dateCreated";
    public static final String ITEMS_PARAM = "items";
    public static final String MATERIALS_PARAM = "materials";
    public static final String CATEGORY_ID_PARAM = "categoryId";
    public static final String MATERIAL_ID_PARAM = "materialId";
    public static final String SUPPLY_ID_PARAM = "supplyId";
    public static final String WORKING_CALENDER_ID_PARAM = "workingCalenderId";
    public static final String IDENTITY_CARD_ID_PARAM = "identityCard";
    public static final String ORDER_ID_PARAM = "orderId";
    public static final String ITEM_ID_PARAM = "itemId";
    public static final String SHIPPING_PARAM = "shipping";
    public static final String EMAIL_PARAM = "email";
    public static final String ROLE_ID_PARAM = "roleId";
    public static final String ROLES_PARAM = "roles";
    public static final String PHONE_PARAM = "phone";
    public static final String USER_ID_PARAM = "userId";
    public static final String SENDER_DB_ID_PARAM = "senderDbId";
    public static final String ROOM_DB_ID_PARAM = "roomDbId";
    public static final String SENDER_DB_S_PARAM = "senderDbs";
    public static final String LAST_CONNECT = "lastConnect";
    public static final String ROOM_DB_S_PARAM = "roomDbs";
    public static final String CODE_PARAM = "code";
    public static final String SEARCH_STRING_PARAM = "searchString";
    public static final String RANGE_TIME_PARAM = "rangeTime";
  }
  
  public static class PATH_PARAM {
    public static final String ROOM_NAME = "/{roomName}";
  }
  
  public static class API_URL {
    public static final String MAIN_API = "/api/";
    public static final String FIND_INFO = "/find-info";
    public static final String FIND_ALL = "/find-all";
    public static final String FIND_ONE = "/find-one";
    public static final String FIND_LIST = "/find-list";
    public static final String FIND_BY_NAME = "/find-by-name";
    public static final String SAVE = "/save";
    public static final String ENABLED_OR_NOT = "/enabled-or-not";
    public static final String FIND_BY_IDENTITY_CARD = "/find-by-identity-card";
    public static final String FIND_BY_EMAIL = "/find-by-email";
    public static final String RESET_PASSWORD = "/reset-password";
    public static final String CHANGE_PASSWORD = "/change-password";
    public static final String FIND_DAILY_REPORT = "/find-daily-report";
    public static final String USER_HAS_SEEN = "/user-has-seen";
    public static final String JOIN_ROOM = "/join-room";
    public static final String SEND_MESSAGE = "/send-message";
    public static final String FIND_ALL_INTERNAL = "/find-all-internal";
    public static final String FIND_ALL_NOT_INTERNAL_IN_24H = "/find-all-not-internal-in-24h";
    public static final String FIND_ALL_NOT_INTERNAL = "/find-all-not-internal";
    public static final String FIND_ALL_NOT_INTERNAL_IN_24H_IN_CHARGE_OF_USER = "/find-all-not-internal-in-24h-in-charge-of-user";
    public static final String FIND_BY_USERS_IN_ROOM = "/find-by-users-in-room";
    public static final String COUNT_NOT_SEEN_NOTI = "/count-not-seen-noti";
    public static final String CREATE = "/create";
    public static final String DELETE = "/delete";
  }
  
  public static class MODEL {
    public static final String CATEGORY_MODEL = "category";
    public static final String ITEM_MODEL = "item";
    public static final String MATERIAL_MODEL = "material";
    public static final String MATERIAL_DAILY_REPORT_MODEL = "material-daily-report";
    public static final String ORDER_MODEL = "order";
    public static final String ORDER_STATUS_MODEL = "order-status";
    public static final String QUANTITY_MODEL = "quantity";
    public static final String ROLE_MODEL = "role";
    public static final String STAFF_MODEL = "staff";
    public static final String STORE_MODEL = "store";
    public static final String SUPPLY_MODEL = "supply";
    public static final String TIMEKEEPING_MODEL = "timekeeping";
    public static final String TIMEKEEPING_STATUS_MODEL = "timekeeping-status";
    public static final String USER_MODEL = "user";
    public static final String WORKING_CALENDER_MODEL = "working-calender";
    public static final String NOTIFICATION_DB_MODEL = "notification-db";
    public static final String ROOM_DB_MODEL = "room-db";
    public static final String MESSAGE_DB_MODEL = "message-db";
    public static final String SENDER_DB_MODEL = "sender-db";
    public static final String CONFIG_GLOBAL_MODEL = "config-global";
    public static final String REPORT_MODEL = "report";
  }
  
  public static class FORMAT {
    public static final String DATE_TIME_FORMAT_1 = "yyyy-MM-dd hh:mm:ss";
    public static final String DATE_FORMAT_1 = "yyyy-MM-dd";
    public static final String RANDOM_STRING_ADVANCED = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
        + "lmnopqrstuvwxyz0123456789";
    public static final String RANDOM_STRING_BASIC = "abcdefghijklmnopqrstuvwxyz";
  }
  
  public static class ROLE {
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_STORE = "ROLE_STORE";
    public static final String ROLE_STAFF = "ROLE_STAFF";
  }
  
  public static class CAPCHA {
    public static final String CAPCHA_SECRET = "6LdRSWsUAAAAABByikwRlRTTH1bYSM_OKDVd6-ES";
    public static final String URL_SERVER_VERIFY_FORMAT = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s&remoteip=%s";
  }
  
  public static class VALIDATION {
    public static final int PHONE_MAX_LENGTH = 11;
    public static final int PHONE_MIN_LENGTH = 8;
    public static final String PHONE_FIRST_CHAR = "0";
  }
  
  public static class PREFIX_CODE {
    public static final String ORDER_PREFIX = "ORD";
    public static final String ITEM_PREFIX = "ITE";
    public static final String CATEGORY_PREFIX = "CAT";
    public static final String STORE_PREFIX = "STO";
  }
  
  public static class CONFIG_NAME {
    public static final String LOGO = "logo";
    public static final String HEADQUARTER = "headquarter";
    public static final String HOT_LINE = "hotLine";
    public static final String EMAIL = "email";
    public static final String MIN_TOTAL_PRICE = "minTotalPrice";
    public static final String FREE_SHIP_DISTANCE = "freeShipDistance";
    public static final String MIN_AHA_DISTANCE = "minAhaDistance";
    public static final String SUBSIDY_PRICE = "subsidyPrice";
    public static final String SINGLE_SHIPPING_PRICE = "singleShippingPrice";
    public static final String MIN_SHIPPING_PRICE = "minShippingPrice";
    public static final String DEFAULT_PASSWORD = "12345678";
  }
}
