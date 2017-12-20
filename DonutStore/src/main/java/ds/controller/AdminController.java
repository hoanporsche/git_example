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
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  private ItemService itemService;

  @Autowired
  private MaterialService materialService;

  //List material for show on screen when add to item
  private List<Material> listMaterial;
  //List Material will use when we call ItemService to create/update item 
  private Set<Material> materials = new HashSet<>();
  //will use to create/update material
  private List<Material> listmaterials;
  private int listMaterialLength;
  private List<Item> listItem;

  @GetMapping("/user")
  public String adminUser(Model model, Authentication auth) {
    return "adminUser";
  }

  @GetMapping("/staff")
  public String adminStaff(Model model, Authentication auth) {
    return "adminStaff";
  }

  @GetMapping("/income")
  public String adminIncome(Model model, Authentication auth) {
    return "adminIncome";
  }

  /**
   * 
   * @description: show all Items and Materials on screen, create initial 'listMaterial' with all
   *              elements and clear all elements that was contained in 'materials'.
   * @author: VDHoan
   * @date_created: Dec 15, 2017
   * @param model : will be used to add attr to view .
   * @return adminItemMaterial .
   */
  @GetMapping("/item-material")
  public String adminItemMaterial(Model model) {
    listMaterial = materialService.findAll();
    listmaterials = new ArrayList<>(listMaterial);
    materials.clear();
    listMaterialLength = 1;
    model.addAttribute(ConAttr.MATERIALS, listMaterial);
    listItem = itemService.findAll();
    model.addAttribute(ConAttr.ITEMS, listItem);
    model.addAttribute(ConAttr.MATERIALFORM, new MaterialForm());
    model.addAttribute(ConAttr.ITEMFORM, new ItemForm());
    return "adminItemMaterial";
  }

  /**
   * @description: method will be receipt 'materialCode' and  will find and add a object Material 
   *              to 'materials' by 'materialCode'. 
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will be receipt by AJAX.
   * @return Response : with message 'setListOk'.
   */
  @PostMapping("/setListMaterialForItem")
  @ResponseBody
  public Response setListMaterialForItem(@RequestBody String materialCode) {
    Material m = materialService.findOneFromList(listMaterial, 
        materialCode.substring(1, materialCode.length() - 1));
    if (m == null) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    materials.add(m);
    listMaterial.removeAll(materials);
    return new Response(ResponseMess.SET_LIST_OK);
  }
  
  /**
   * @description: alter 'listMaterial', the list will be removed all elements that
   *               was contained in 'materials' and the list will be responsed to screen 
   *               by method AJAX.
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @return Response : with message 'getListMaterial' and a list material.
   */
  @GetMapping("/getListMaterial")
  @ResponseBody
  public Response getListMaterial() {
    //If material is not chosen , we'll not response list
    if (materials.size() < listMaterialLength || listMaterial.isEmpty()) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    listMaterialLength++;
    return new Response(ResponseMess.GET_LIST_MATERIAL, listMaterial);
  }

  @PostMapping("/setOldListMaterial")
  @ResponseBody
  public Response setOldListMaterial(@RequestBody String itemCode) {
    //If material is not chosen , we'll not response list
    if (itemService.findOneFromList(listItem,
        itemCode.substring(1, itemCode.length() - 1)) == null) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    materials = new HashSet<>(itemService.findOneFromList(listItem, itemCode.substring(1,
        itemCode.length() - 1)).getMaterials());
    listMaterial = new ArrayList<>(listmaterials);
    listMaterial.removeAll(materials);
    listMaterialLength = materials.size() + 1;
    return new Response(ResponseMess.SET_LIST_OK,materials,listMaterial);
  }
  
  /**
   * @description: delete a object Material in 'materials' that will be found by materialCode. 
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will receipt by AJAX .
   * @return Response : with message 'setListOk'.
   */
  @PostMapping("/deleteMaterialInListForItem")
  @ResponseBody
  public Response deleteMaterialInListForItem(@RequestBody String materialCode) {
    Material material = materialService.findOneFromList(listmaterials, 
        materialCode.substring(1, materialCode.length() - 1));
    if (material == null || !materials.contains(material)) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    materials.remove(material);
    listMaterialLength--;
    return new Response(ResponseMess.SET_LIST_OK);
  }

  /**
   * @description: delete all Materials in list when closing modal.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   */
  @GetMapping("/deleteAllMaterials")
  @ResponseBody
  public void deleteAllMaterialsInList() {
    listMaterial = materialService.findAll();
    materials.clear();
    listMaterialLength = 1;
  }
  
  /**
   * @description: create a new Item base on ItemForm.
   * @author: VDHoan
   * @date_created: Dec 12, 2017
   * @param itemForm .
   * @param bindingResult .
   * @param redirect .
   * @return adminItemMaterial.
   */
  @PostMapping("/createItem")
  public String createItem(@Valid @ModelAttribute("itemForm") ItemForm itemForm,
      BindingResult bindingResult, RedirectAttributes redirect) {
    if (bindingResult.hasErrors()) {
      return "adminItemMaterial";
    }
    if (materials.isEmpty()) {
      redirect.addFlashAttribute("notFoundItem", "Please choose materials first");
      return "redirect:/admin/item-material";
    }
    if (itemForm.getItemCode() != null) {
      itemForm.setItemId(itemService.findOneFromList(listItem, itemForm.getItemCode()).getItemId());
    }
    itemForm.setMaterials(materials);
    itemService.saveItem(itemForm);
    return "redirect:/admin/item-material";
  }

  /**
   * @description: Create a object Material by sending 'materialForm' to create,
   *              the 'materialForm' will be validated by 'bindingResult'.
   * @author: VDHoan
   * @date_created: Dec 15, 2017
   * @param materialForm .
   * @param bindingResult . 
   * @return adminItemMaterial.
   */
  @PostMapping("/createMaterial")
  public String createMaterial(@Valid @ModelAttribute("materialForm") MaterialForm materialForm,
      BindingResult bindingResult, RedirectAttributes redirect) {
    if (bindingResult.hasErrors()) {
      return "adminItemMaterial";
    }
    if (!StringUtils.isEmpty(materialForm.getMaterialCode())) {
      Material m = materialService.findOneFromList(listmaterials, materialForm.getMaterialCode());
      if (m == null) {
        redirect.addFlashAttribute("notFoundMaterial", "Please don't fix my material code");
        return "redirect:/admin/item-material";
      } 
      materialForm.setMaterialId(m.getMaterialId());
    } 
    materialService.saveMaterial(materialForm);
    return "redirect:/admin/item-material";
  }

  /**
   * @description: delete Item means hidding Item by setting status false.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   * @param itemCode .
   * @param redirect .
   * @return redirect:/admin/item-material.
   */
  @GetMapping("/deleteItem")
  public String deleteItem(@RequestParam("id") String itemCode, RedirectAttributes redirect) {
    if (itemService.findOneFromList(listItem, itemCode) == null) {
      redirect.addFlashAttribute("notFoundItem", "Please don't fix my item code");
      return "redirect:/admin/item-material";
    }
    itemService.hideItem(itemService.findOneFromList(listItem, itemCode));
    return "redirect:/admin/item-material";
  }

  /**
   * @description: hide 'material'.
   * @author: VDHoan
   * @date_created: Dec 16, 2017
   * @param materialCode : will be receipt . 
   * @param redirect : to redirect FlashAttribute.
   * @return redirect:/admin/item-material.
   */
  @GetMapping("/deleteMaterial")
  public String deleteMaterial(@RequestParam String materialCode, RedirectAttributes redirect) {
    Material m = materialService.findOneFromList(listmaterials, materialCode);
    if (m == null) {
      redirect.addFlashAttribute("notFoundMaterial", "Please don't fix my material code");
      return "redirect:/admin/item-material";
    } 
    materialService.hideMaterial(m);
    return "redirect:/admin/item-material";
  }

  @GetMapping("/timekeeping")
  public String adminTimekeeping(Model model, Authentication auth) {
    return "adminTimekeeping";
  }
}
