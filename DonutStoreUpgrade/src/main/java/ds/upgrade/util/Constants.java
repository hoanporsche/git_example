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
public class Constants {

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
  }
  
  public static class PARAM {
    public static final String ID_PARAM = "id";
    public static final String ENABLED_PARAM = "enabled";
    public static final String NAME_PARAM = "name";
    public static final String STATUS_ID_PARAM = "statusId";
    public static final String STAFF_ID_PARAM = "staffId";
    public static final String STORE_ID_PARAM = "storeId";
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
    public static final String IS_SHIPPING_PARAM = "isShipping";
    public static final String EMAIL_PARAM = "email";
    public static final String ROLE_ID_PARAM = "roleId";
    public static final String ROLES_PARAM = "roles";
  }
  
  public static class API_URL {
    public static final String MAIN_API = "/api/";
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
  }
  
  public static class FORMAT {
    public static final String DATE_TIME_FORMAT_1 = "yyyy-MM-dd hh:mm:ss";
    public static final String DATE_FORMAT_1 = "yyyy-MM-dd";
  }
  
  public static class ROLE {
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_STORE = "ROLE_STORE";
    public static final String ROLE_STAFF = "ROLE_STAFF";
  }
}
