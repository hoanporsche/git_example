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
  }
  
  public static class PARAM {
    public static final String ID_PARAM = "id";
    public static final String ENABLED_PARAM = "enabled";
    public static final String NAME_PARAM = "name";
  }
  
  public static class PROPERTY {
    public static final String ITEMS_PROPERTY = "items";
    public static final String MATERIALS_PROPERTY = "materials";
  }
  
  public static class API_URL {
    public static final String MAIN_API = "/api/";
    public static final String FIND_ALL = "/find-all";
    public static final String FIND_ONE = "/find-one";
    public static final String FIND_LIST = "/find-list";
    public static final String FIND_BY_NAME = "/find-by-name";
    public static final String SAVE = "/save";
    public static final String ENABLED_OR_NOT = "/enabled-or-not";
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
  
}
