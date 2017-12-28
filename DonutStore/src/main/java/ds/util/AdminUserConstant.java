package ds.util;

public class AdminUserConstant {
  
  public class AdminUserMessage {
    public static final String NOT_FOUND_ACCOUNT = "Not found account";
    public static final String ROLE_ = "ROLE_";
    public static final String WRONG_SYNTAX = "'ROLE_' phải ở đầu";
    public static final String USER_VALIDATION = "Email not found or wrong syntax";
    public static final String SET_LIST_OK = "setListOk";
    public static final String STORE_VALIDATION = "Wrong syntax or null some fields";
  }
  
  public class AdminUserAttribute {
    public static final String NEW_PASSWORD = "newPassword";
    public static final String WRONG_SYNTAX = "WrongSyntax";
    public static final String ROLES = "roles";
    public static final String USERS = "users";
    public static final String STAFFS = "staffs";
    public static final String STORES = "stores";
    public static final String ROLE = "role";
    public static final String USER_FORM = "userForm";
    public static final String USER_VALIDATION = "UserValidation";
    public static final String STORE_FORM = "storeForm";
    public static final String STORE_VALIDATION = "storeValidation";
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
    public static final String GET_ROLES_AND_STORE = "/getRolesAndStore";
    public static final String DELETE_ROLE = "/deleteRole";
    public static final String SAVE_ROLE = "/saveRole";
    public static final String GET_REMAIN_ROLES = "/getRemainRoles";
    public static final String SAVE_STORE = "/saveStore";
    public static final String CREATE_STORE = "/createStore";
  }
  
  public class AdminUserReturn {
    public static final String ADMIN_USER = "admin/user";
    public static final String REDIRECT_ADMIN_USER = "redirect:/admin/user";
    //public static final String 
  }
}
