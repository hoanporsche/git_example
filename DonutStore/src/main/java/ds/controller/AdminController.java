package ds.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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

import ds.form.ItemForm;
import ds.form.MaterialForm;
import ds.message.Message.ConAttr;
import ds.message.Message.ResponseMess;
import ds.message.Response;
import ds.model.Material;
import ds.service.ItemService;
import ds.service.MaterialService;

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
  List<Material> listmaterials;

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
    listmaterials = listMaterial;
    materials.clear();
    model.addAttribute(ConAttr.MATERIALS, listMaterial);
    model.addAttribute(ConAttr.ITEMS, itemService.findAll());
    model.addAttribute(ConAttr.MATERIALFORM, new MaterialForm());
    model.addAttribute(ConAttr.ITEMFORM, new ItemForm());
    return "adminItemMaterial";
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
    listMaterial.removeAll(materials);
    return new Response(ResponseMess.GETLISTMATERIAL, listMaterial);
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
    materials.add(materialService.findOneFromList(listMaterial, 
        materialCode.substring(1, materialCode.length() - 1)));
    return new Response(ResponseMess.SETLISTOK);
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
    materials.remove(materialService.findOneFromList(listMaterial, materialCode));
    return new Response(ResponseMess.SETLISTOK);
  }

  /**
   * @description:
   * @author: VDHoan
   * @date_created: Dec 12, 2017
   * @param itemForm .
   * @param bindingResult .
   * @param request .
   * @return adminItemMaterial.
   */
  @PostMapping("/createItem")
  public String createItem(@Valid @ModelAttribute("itemForm") ItemForm itemForm,
      BindingResult bindingResult, HttpServletRequest request) {
    if (bindingResult.hasErrors()) {
      return "adminItemMaterial";
    }
    itemForm.setMaterials(materials);
    return "adminItemMaterial";
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
    Material m = materialService.findOneFromList(listmaterials, materialForm.getMaterialCode());
    if (m == null) {
      redirect.addFlashAttribute("notFoundMaterial", "Please don't fix my material code");
      return "redirect:/admin/item-material";
    } 
    materialForm.setMaterialId(m.getMaterialId());
    materialService.createMaterial(materialForm);
    return "redirect:/admin/item-material";
  }

  @GetMapping("/deleteItem")
  public String deleteItem(@RequestParam String itemCode) {
    System.out.println(itemCode);
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
    System.out.println(materialCode);
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
