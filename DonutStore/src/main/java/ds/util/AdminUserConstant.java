package ds.util;

public class AdminUserConstant {
  
  public class AdminUserMessage {
    public static final String NOT_FOUND_ACCOUNT = "Not found account";
    public static final String ROLE_ = "ROLE_";
    public static final String WRONG_SYNTAX = "'ROLE_' phải ở đầu";
    public static final String USER_VALIDATION = "Email not found or wrong syntax";
    public static final String SET_LIST_OK = "setListOk";
    public static final String STORE_VALIDATION = "Wrong syntax or null some fields";
    public static final String STAFF_VALIDATION = "Wrong syntax or null some fields";
  }
  
  public class AdminUserAttribute {
    public static final String NEW_PASSWORD = "newPassword";
    public static final String WRONG_SYNTAX = "WrongSyntax";
    public static final String ROLES = "roles";
    public static final String USERS = "users";
    public static final String STAFFS = "staffs";
    public static final String ALL_STORES = "stores";
    public static final String AVAILABLE_STORES = "availableStores";
    public static final String ROLE = "role";
    public static final String USER_FORM = "userForm";
    public static final String USER_VALIDATION = "UserValidation";
    public static final String STORE_FORM = "storeForm";
    public static final String STORE_VALIDATION = "storeValidation";
    public static final String STAFF_FORM = "staffForm";
    public static final String STAFF_VALIDATION = "staffValidatation";
    public static final String AVALABLE_ITEMS = "availableItems";
  }
  
  public class AdminUserParam {
    public static final String USER_EMAIL = "userEmail";
  }
  
  public class AdminUserUrl {
    public static final String ADMIN = "/admin";
    public static final String USER = "/user";
    public static final String CREATE_ROLE = "/createRole";
    public static final String RESET_PASSWORD = "/resetPassword";
    public static final String EDIT_USER_ROLES = "/editUserRolesStore";
    public static final String GET_OLD_ROLES = "/getOldRoles";
    public static final String DELETE_ROLE = "/deleteRole";
    public static final String SAVE_ROLE = "/saveRole";
    public static final String GET_REMAIN_ROLES = "/getRemainRoles";
    public static final String SAVE_STORE = "/saveStore";
    public static final String CREATE_STORE = "/createStore";
    public static final String HIDE_STORE = "/hideStore";
    public static final String SHOW_STORE = "/showStore";
    public static final String CREATE_STAFF = "/createStaff";
    public static final String HIDE_STAFF = "/hideStaff";
    public static final String SHOW_STAFF = "/showStaff";
    public static final String GET_REMAIN_ITEMS = "/getRemainItems";
    public static final String GET_OLD_ITEMS = "/getOldItems";
    public static final String SAVE_ONE_ITEM = "/saveOneItem";
    public static final String DELETE_ONE_ITEM = "/deleteOneItem";
  }
  
  public class AdminUserReturn {
    public static final String ADMIN_USER = "admin/user";
    public static final String REDIRECT_ADMIN_USER = "redirect:/admin/user";
    //public static final String 
  }
}
