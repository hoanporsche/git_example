package ds.util;

public class AdminConstant {
  public class AdminUrl {
    public static final String MAIN = "/admin";
    public static final String ITEM_MATERIAL = "item-material";
    public static final String SET_LIST_MATERIAL_FOR_ITEM = "/setListMaterialForItem";
    public static final String GET_LIST_MATERIAL = "/getListMaterial";
    public static final String SET_OLD_LIST_MATERIAL = "/setOldListMaterial";
    public static final String DELETE_MATERIAL_IN_LIST_FOR_ITEM = "/deleteMaterialInListForItem";
    public static final String DELETE_ALL_MATERIALS = "/deleteAllMaterials";
    public static final String CREATE_ITEM = "/createItem";
    public static final String CREATE_MATERIAL = "/createMaterial";
    public static final String DELETE_ITEM = "/deleteItem";
    public static final String DELETE_MATERIAL = "/deleteMaterial";
    public static final String SET_OLD_MATERIAL = "/setOldMaterial";
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
  }
  
  public class AdminMessage {
    public static final String CHOOSE_MATERIALS_FIRST = "Please choose materials first";
    public static final String DONT_FIX_ITEMCODE = "Please dont fix my itemCode";
    public static final String DONT_FIX_MATERIALCODE = "Please don't fix my material code";
  }
}
