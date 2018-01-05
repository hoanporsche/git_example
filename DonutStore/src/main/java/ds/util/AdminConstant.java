package ds.util;

public class AdminConstant {
  public class AdminUrl {
    public static final String MAIN = "/admin";
    public static final String ITEM_MATERIAL = "item-material";
    public static final String SAVE_ONE_MATERIAL = "/saveOneMaterial";
    public static final String GET_REMAIN_MATERIAL = "/getRemainMaterial";
    public static final String SET_OLD_LIST_MATERIAL = "/setOldListMaterial";
    public static final String DELETE_ONE_MATERIAL = "/deleteOneMaterial";
    public static final String DELETE_ALL_MATERIALS = "/deleteAllMaterials";
    public static final String CREATE_ITEM = "/createItem";
    public static final String CREATE_MATERIAL = "/createMaterial";
    public static final String HIDE_ITEM = "/hideItem";
    public static final String SHOW_ITEM = "/showItem";
    public static final String HIDE_MATERIAL = "/hideMaterial";
    public static final String SHOW_MATERIAL = "/showMaterial";
    public static final String SET_OLD_MATERIAL = "/setOldMaterial";
    public static final String SAVE_SUPPLY = "saveSupply";
    public static final String HIDE_SUPPLY = "hideSupply";
    public static final String SHOW_SUPPLY = "showSupply";
    public static final String SAVE_CATEGORY = "saveCategory";
    public static final String HIDE_CATEGORY = "hideCategory";
    public static final String SHOW_CATEGORY = "showCategory";
  }
  
  public class AdminReturn {
    public static final String ADMIN_ITEMMATERIAL = "admin/itemMaterial";
    public static final String REDIRECT_ADMIN_ITEMMATERIAL = "redirect:/admin/item-material";
  }
  
  public class AdminAttribute {
    public static final String ITEM_FORM = "itemForm";
    public static final String NOT_FOUND_ITEM = "notFoundItem";
    public static final String MATERIAL_FORM = "materialForm";
    public static final String NOT_FOUND_MATERIAL = "notFoundMaterial";
    public static final String ID = "id";
    public static final String ALL_SUPPLIES = "allSupplies";
    public static final String ALL_AVAILABLE_SUPPLIES = "allAvailableSupplies";
    public static final String SUPPLY = "supply";
    public static final String SUPPLY_VALIDATION = "supplyValidation";
    public static final String ALL_CATEGORIES = "allCategories";
    public static final String ALL_AVAILABLE_CATEGORIES = "allAvailableCategories";
    public static final String CATEGORY = "category";
    public static final String CATEGORY_VALIDATION = "categoryValidation";
  }
  
  public class AdminMessage {
    public static final String CHOOSE_MATERIALS_FIRST = "Please choose materials first";
    public static final String DONT_FIX_ITEMCODE = "Please dont fix my itemCode";
    public static final String DONT_FIX_MATERIALCODE = "Please don't fix my material code";
    public static final String SUPPLY_VALIDATION = "Wrong syntax or some fields are null";
    public static final String CATEGORY_VALIDATION = "Wrong syntax or some fields are null";
  }
  
  public class AdminParam {
    public static final String SUPPLY_CODE = "supplyCode";
    public static final String CATEGORY_CODE = "categoryCode";
  }
}