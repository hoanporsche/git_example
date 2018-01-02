package ds.controller;

import ds.form.ItemForm;
import ds.form.MaterialForm;
import ds.message.Message.ConAttr;
import ds.message.Message.ResponseMess;
import ds.message.Response;
import ds.model.Item;
import ds.model.Material;
import ds.service.ItemService;
import ds.service.MaterialService;
import ds.util.AdminConstant.AdminAttribute;
import ds.util.AdminConstant.AdminMessage;
import ds.util.AdminConstant.AdminReturn;
import ds.util.AdminConstant.AdminUrl;
import ds.util.Constant;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping(AdminUrl.MAIN)
public class AdminController {

  @Autowired
  private ItemService itemService;
  @Autowired
  private MaterialService materialService;

  //List material for show on screen when add to item
  private List<Material> remainMaterial;
  //List Material will use when we call ItemService to create/update item 
  private Set<Material> currentMaterials = new HashSet<>();
  //will use to create/update material
  private List<Material> materialsFound;
  private int sizeOfCurrentMaterials;
  private List<Item> listItem;

  @GetMapping("/income")
  public String adminIncome(Model model, Authentication auth) {
    return "admin/income";
  }

  /** .
   * @description: show all Items and Materials on screen, create initial 'listMaterial' with all
   *              elements and clear all elements that was contained in 'materials'.
   * @author: VDHoan
   * @date_created: Dec 15, 2017
   * @param model : will be used to add attr to view .
   * @return adminItemMaterial .
   */
  @GetMapping(AdminUrl.ITEM_MATERIAL)
  public String adminItemMaterial(Model model) {
    remainMaterial = materialService.findAllByStatus();
    materialsFound = new ArrayList<>(remainMaterial);
    currentMaterials.clear();
    sizeOfCurrentMaterials = 1;
    model.addAttribute(ConAttr.MATERIALS, materialService.findAll());
    listItem = itemService.findAllByStatus();
    model.addAttribute(ConAttr.ITEMS, itemService.findAll());
    model.addAttribute(ConAttr.MATERIALFORM, new MaterialForm());
    model.addAttribute(ConAttr.ITEMFORM, new ItemForm());
    return AdminReturn.ADMIN_ITEMMATERIAL;
  }

  /** .
   * @description: method will be receipt 'materialCode' and  will find and add a object Material 
   *              to 'materials' by 'materialCode'. 
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will be receipt by AJAX.
   * @return Response : with message 'setListOk'.
   */
  @PostMapping(AdminUrl.SAVE_ONE_MATERIAL)
  @ResponseBody
  public Response setListMaterialForItem(@RequestBody String materialCode) {
    Material m = materialService.findOneFromList(remainMaterial, 
        materialCode.substring(1, materialCode.length() - 1));
    if (m == null || currentMaterials.contains(m)) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    currentMaterials.add(m);
    remainMaterial.removeAll(currentMaterials);
    return new Response(ResponseMess.SET_LIST_OK);
  }
  
  /**.
   * @description: alter 'listMaterial', the list will be removed all elements that
   *               was contained in 'materials' and the list will be responsed to screen 
   *               by method AJAX.
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @return Response : with message 'getListMaterial' and a list material.
   */
  @GetMapping(AdminUrl.GET_REMAIN_MATERIAL)
  @ResponseBody
  public Response getListMaterial() {
    //If material is not chosen , we'll not response list
    if (currentMaterials.size() < sizeOfCurrentMaterials || remainMaterial.isEmpty()) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    sizeOfCurrentMaterials++;
    return new Response(ResponseMess.GET_REMAIN_MATERIAL, remainMaterial);
  }

  /**.
   * @description: set List for edit item.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   * @param itemCode .
   * @return Response.
   */
  @PostMapping(AdminUrl.SET_OLD_LIST_MATERIAL)
  @ResponseBody
  public Response setOldListMaterial(@RequestBody String itemCode) {
    //If material is not chosen , we'll not response list
    if (itemService.findOneFromList(listItem,
        itemCode.substring(1, itemCode.length() - 1)) == null) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    currentMaterials = new HashSet<>(itemService.findOneFromList(listItem, itemCode.substring(1,
        itemCode.length() - 1)).getMaterials());
    remainMaterial = new ArrayList<>(materialsFound);
    remainMaterial.removeAll(currentMaterials);
    sizeOfCurrentMaterials = currentMaterials.size() + 1;
    return new Response(ResponseMess.SET_LIST_OK,currentMaterials,remainMaterial);
  }
  
  /**.
   * @description: delete a object Material in 'materials' that will be found by materialCode. 
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will receipt by AJAX .
   * @return Response : with message 'setListOk'.
   */
  @PostMapping(AdminUrl.DELETE_ONE_MATERIAL)
  @ResponseBody
  public Response deleteMaterialInListForItem(@RequestBody String materialCode) {
    Material material = materialService.findOneFromList(materialsFound, 
        materialCode.substring(1, materialCode.length() - 1));
    if (material == null || !currentMaterials.contains(material)) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    currentMaterials.remove(material);
    remainMaterial.add(material);
    sizeOfCurrentMaterials--;
    return new Response(ResponseMess.SET_LIST_OK);
  }

  /**.
   * @description: delete all Materials in list when closing modal.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   */
  @GetMapping(AdminUrl.DELETE_ALL_MATERIALS)
  @ResponseBody
  public void deleteAllMaterialsInList() {
    remainMaterial = materialService.findAllByStatus();
    currentMaterials.clear();
    sizeOfCurrentMaterials = 1;
  }
  
  /**.
   * @description: create a new Item base on ItemForm.
   * @author: VDHoan
   * @date_created: Dec 12, 2017
   * @param itemForm .
   * @param bindingResult .
   * @param redirect .
   * @return adminItemMaterial.
   */
  @PostMapping(AdminUrl.CREATE_ITEM)
  public String createItem(@Valid @ModelAttribute(AdminAttribute.ITEM_FORM) ItemForm itemForm,
      BindingResult bindingResult, RedirectAttributes redirect) {
    if (bindingResult.hasErrors()) {
      return AdminReturn.ADMIN_ITEMMATERIAL;
    }
    if (currentMaterials.isEmpty()) {
      redirect.addFlashAttribute(AdminAttribute.NOT_FOUND_ITEM, 
          AdminMessage.CHOOSE_MATERIALS_FIRST);
      return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
    }
    if (itemForm.getItemCode() != null) {
      itemForm.setItemId(itemService.findOneFromList(listItem, itemForm.getItemCode()).getItemId());
    }
    itemForm.setMaterials(currentMaterials);
    itemService.saveItem(itemForm);
    return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
  }

  /**.
   * @description: Create a object Material by sending 'materialForm' to create,
   *              the 'materialForm' will be validated by 'bindingResult'.
   * @author: VDHoan
   * @date_created: Dec 15, 2017
   * @param materialForm .
   * @param bindingResult . 
   * @return adminItemMaterial.
   */
  @PostMapping(AdminUrl.CREATE_MATERIAL)
  public String createMaterial(@Valid @ModelAttribute(AdminAttribute.MATERIAL_FORM) 
      MaterialForm materialForm, BindingResult bindingResult, RedirectAttributes redirect) {
    if (bindingResult.hasErrors()) {
      return AdminReturn.ADMIN_ITEMMATERIAL;
    }
    if (!StringUtils.isEmpty(materialForm.getMaterialCode())) {
      Material m = materialService.findOneFromList(materialsFound, materialForm.getMaterialCode());
      if (m == null) {
        redirect.addFlashAttribute(AdminAttribute.NOT_FOUND_MATERIAL, 
            AdminMessage.DONT_FIX_MATERIALCODE);
        return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
      } 
      materialForm.setMaterialId(m.getMaterialId());
    } 
    materialService.saveMaterial(materialForm);
    return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
  }

  /**.
   * @description: hidding Item by setting status false.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   * @param itemCode .
   * @param redirect .
   * @return redirect:/admin/item-material.
   */
  @GetMapping(AdminUrl.HIDE_ITEM)
  public String hideItem(@RequestParam(AdminAttribute.ID) String itemCode, 
      RedirectAttributes redirect) {
    Item item = itemService.findByitemCode(itemCode);
    if (item == null) {
      redirect.addFlashAttribute(AdminAttribute.NOT_FOUND_ITEM, AdminMessage.DONT_FIX_ITEMCODE);
      return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
    }
    itemService.hideItem(item);
    return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
  }

  /**.
   * @description: showing Item by setting status false.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   * @param itemCode .
   * @param redirect .
   * @return redirect:/admin/item-material.
   */
  @GetMapping(AdminUrl.SHOW_ITEM)
  public String showItem(@RequestParam(AdminAttribute.ID) String itemCode, 
      RedirectAttributes redirect) {
    Item item = itemService.findByitemCode(itemCode);
    if (item == null) {
      redirect.addFlashAttribute(AdminAttribute.NOT_FOUND_ITEM, AdminMessage.DONT_FIX_ITEMCODE);
      return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
    }
    itemService.showItem(item);
    return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
  }
  
  /**.
   * @description: hide 'material'.
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will be receipt . 
   * @param redirect : to redirect FlashAttribute.
   * @return redirect:/admin/item-material.
   */
  @GetMapping(AdminUrl.HIDE_MATERIAL)
  public String hideMaterial(@RequestParam String materialCode, RedirectAttributes redirect) {
    Material m = materialService.findBymaterialCode(materialCode);
    if (m == null) {
      redirect.addFlashAttribute(AdminAttribute.NOT_FOUND_MATERIAL, 
          AdminMessage.DONT_FIX_MATERIALCODE);
      return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
    } 
    materialService.hideMaterial(m);
    return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
  }
  
  /**.
   * @description: show 'material'.
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will be receipt . 
   * @param redirect : to redirect FlashAttribute.
   * @return redirect:/admin/item-material.
   */
  @GetMapping(AdminUrl.SHOW_MATERIAL)
  public String showMaterial(@RequestParam String materialCode, RedirectAttributes redirect) {
    Material m = materialService.findBymaterialCode(materialCode);
    if (m == null) {
      redirect.addFlashAttribute(AdminAttribute.NOT_FOUND_MATERIAL, 
          AdminMessage.DONT_FIX_MATERIALCODE);
      return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
    } 
    materialService.showMaterial(m);
    return AdminReturn.REDIRECT_ADMIN_ITEMMATERIAL;
  }

  @GetMapping("/timekeeping")
  public String adminTimekeeping(Model model, Authentication auth) {
    return "admin/timekeeping";
  }
}
