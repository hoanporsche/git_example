package ds.controller;

import ds.form.StaffForm;
import ds.form.StoreForm;
import ds.form.UserForm;
import ds.message.Response;
import ds.model.Item;
import ds.model.Role;
import ds.model.Staff;
import ds.model.Store;
import ds.model.User;
import ds.service.ItemService;
import ds.service.RoleService;
import ds.service.StaffService;
import ds.service.StoreService;
import ds.service.UserService;
import ds.util.AdminUserConstant.AdminUserAttribute;
import ds.util.AdminUserConstant.AdminUserMessage;
import ds.util.AdminUserConstant.AdminUserParam;
import ds.util.AdminUserConstant.AdminUserReturn;
import ds.util.AdminUserConstant.AdminUserUrl;
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
@RequestMapping(AdminUserUrl.ADMIN)
public class AdminUserController {

  @Autowired
  private UserService userService;
  @Autowired
  private StaffService staffService;
  @Autowired
  private RoleService roleSerivce;
  @Autowired
  private StoreService storeService;
  @Autowired
  private ItemService itemService;
  
  private List<User> listUser;
  
  private List<Store> listStore;
  
  //current list roles, that's contained in User.
  private Set<Role> currentRoles = new HashSet<>();
  //remain role not chosen
  private List<Role> remainRoles;
  //list roles that's found in user.
  private List<Role> rolesFound;
  
  int sizeOfCurrentRole;
  
  //current list items, that's contained in Store
  private Set<Item> currentItems = new HashSet<>();
  //remain item not chosen
  private List<Item> remainItems;
  //list items that's found in Store
  private List<Item> itemsFound;
  
  int sizeOfCurrentItem;
  
  /** .
   * @description: Main view of manage users in system. 
   * @author: VDHoan
   * @date_created: Dec 22, 2017
   * @param model .
   * @param auth .
   * @return
   */
  @GetMapping(AdminUserUrl.USER)
  public String adminUser(Model model, Authentication auth) {
    currentRoles.clear();
    remainRoles = roleSerivce.findAll();
    rolesFound = new ArrayList<>(remainRoles);
    model.addAttribute(AdminUserAttribute.ROLES, rolesFound);
    listUser = (List<User>) userService.findAll();
    model.addAttribute(AdminUserAttribute.USERS, listUser);
    model.addAttribute(AdminUserAttribute.STAFFS, staffService.findAll());
    listStore = (List<Store>) storeService.findAll();
    model.addAttribute(AdminUserAttribute.ALL_STORES, listStore);
    model.addAttribute(AdminUserAttribute.AVAILABLE_STORES, storeService.findAllByStatus());
    model.addAttribute(AdminUserAttribute.USER_FORM, new UserForm());
    model.addAttribute(AdminUserAttribute.ROLE, new Role());
    model.addAttribute(AdminUserAttribute.STORE_FORM, new StoreForm());
    model.addAttribute(AdminUserAttribute.STAFF_FORM, new StaffForm());
    sizeOfCurrentRole = 1;
    
    currentItems.clear();
    remainItems = itemService.findAllByStatus();
    itemsFound = new ArrayList<>(remainItems);
    model.addAttribute(AdminUserAttribute.AVALABLE_ITEMS, itemsFound);
    sizeOfCurrentItem = 1;
    return AdminUserReturn.ADMIN_USER;
  }
  
  /** .
   * @description: create new Role with validation. 
   * @author: VDHoan
   * @date_created: Dec 22, 2017
   * @param role .
   * @param bindingResult .
   * @param redirect .
   * @return
   */
  @PostMapping(AdminUserUrl.CREATE_ROLE)
  public String createRole(@Valid @ModelAttribute(AdminUserAttribute.ROLE) Role role, 
      BindingResult bindingResult,
      RedirectAttributes redirect) {
    if (bindingResult.hasErrors()) {
      return AdminUserReturn.ADMIN_USER;
    }
    if (!AdminUserMessage.ROLE_.equals(role.getRoleName().substring(0, 5))) {
      redirect.addFlashAttribute(AdminUserAttribute.WRONG_SYNTAX, AdminUserMessage.WRONG_SYNTAX);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    roleSerivce.save(role);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: reset password of one user. 
   * @author: VDHoan
   * @date_created: Dec 22, 2017
   * @param userEmail .
   * @param redirect .
   * @return AdminUserReturn.REDIRECT_ADMIN_USER
   */
  @GetMapping(AdminUserUrl.RESET_PASSWORD)
  public String resetPassword(@RequestParam(AdminUserParam.USER_EMAIL) String userEmail,
      RedirectAttributes redirect) {
    redirect.addFlashAttribute(AdminUserAttribute.NEW_PASSWORD, 
        userService.resetPassword(userEmail));
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /**.
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 23, 2017
   * @param userForm .
   * @param result .
   * @return
   */
  @PostMapping(AdminUserUrl.EDIT_USER_ROLES)
  public String editUserRoles(@Valid @ModelAttribute(AdminUserAttribute.USER_FORM) 
      UserForm userForm, BindingResult result, RedirectAttributes redirect) {
    if (result.hasErrors() || StringUtils.isEmpty(userForm.getStoreCode())) {
      redirect.addFlashAttribute(AdminUserAttribute.USER_VALIDATION, 
          AdminUserMessage.USER_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    userForm.setRoles(currentRoles);
    userService.createUser(userForm);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 25, 2017
   * @param userForm .
   * @return
   */
  @PostMapping(AdminUserUrl.GET_OLD_ROLES)
  @ResponseBody
  public Response getOldRoles(@RequestBody UserForm userForm) {
    currentRoles = userService.getUserFromList(listUser, userForm.getUserEmail()).getRoles();
    remainRoles = new ArrayList<>(rolesFound);
    remainRoles.removeAll(currentRoles);
    sizeOfCurrentRole = currentRoles.size() + 1;
    return new Response(AdminUserMessage.SET_LIST_OK, currentRoles, remainRoles);
  }
  
  /** .
   * @description: get all roles in remainRoles. 
   * @author: VDHoan
   * @date_created: Dec 27, 2017
   * @return
   */
  @PostMapping(AdminUserUrl.GET_REMAIN_ROLES)
  @ResponseBody
  public Response getRemainRoles() {
    if (sizeOfCurrentRole > currentRoles.size() || remainRoles.isEmpty()) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
    }
    sizeOfCurrentRole++;
    return new Response(AdminUserMessage.SET_LIST_OK, remainRoles);
  }
  
  /** .
   * @description: save one role into current roles. 
   * @author: VDHoan
   * @date_created: Dec 27, 2017
   * @param roleCode .
   * @return
   */
  @PostMapping(AdminUserUrl.SAVE_ROLE)
  @ResponseBody
  public Response saveRole(@RequestBody String roleCode) {
    Role r = roleSerivce.findOneFromList(rolesFound, roleCode.substring(1, roleCode.length() - 1));
    if (r != null) {
      currentRoles.add(r);
      remainRoles.removeAll(currentRoles);
      return new Response(AdminUserMessage.SET_LIST_OK);
    }
    return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
  }
  
  /** .
   * @description: delete one role in current list roles. 
   * @author: VDHoan
   * @date_created: Dec 27, 2017
   * @param roleCode .
   * @return
   */
  @PostMapping(AdminUserUrl.DELETE_ROLE)
  @ResponseBody
  public Response deleteRole(@RequestBody String roleCode) {
    Role r = roleSerivce.findOneFromList(rolesFound, roleCode.substring(1, roleCode.length() - 1)); 
    if (r != null) {
      currentRoles.remove(r);
      remainRoles.add(r);
      sizeOfCurrentRole--;
      return new Response(AdminUserMessage.SET_LIST_OK);
    }
    return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
  }
  
  /** .
   * @description: create new Staff or edit old Staff 
   * @author: VDHoan
   * @date_created: Jan 1, 2018
   * @param staffForm .
   * @param result .
   * @param redirect .
   * @return
   */
  @PostMapping(AdminUserUrl.CREATE_STAFF)
  public String createStaff(@Valid @ModelAttribute() StaffForm staffForm, BindingResult result,
      RedirectAttributes redirect) {
    if (result.hasErrors()) {
      redirect.addFlashAttribute(AdminUserAttribute.STAFF_VALIDATION, 
          AdminUserMessage.STAFF_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    staffService.save(staffForm);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: Hide staff. 
   * @author: VDHoan
   * @date_created: Jan 1, 2018
   * @param staffCode .
   * @param redirect .
   * @return
   */
  @GetMapping(AdminUserUrl.HIDE_STAFF)
  public String hideStaff(@RequestParam("staffCode") String staffCode, 
      RedirectAttributes redirect) {
    Staff staff = staffService.findBystaffCode(staffCode);
    if (staff == null) {
      redirect.addFlashAttribute(AdminUserAttribute.STAFF_VALIDATION, 
          AdminUserMessage.STAFF_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    staffService.hideStaff(staff);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: Show staff.
   * @author: VDHoan
   * @date_created: Jan 1, 2018
   * @param staffCode .
   * @param redirect .
   * @return
   */
  @GetMapping(AdminUserUrl.SHOW_STAFF)
  public String showStaff(@RequestParam("staffCode") String staffCode, 
      RedirectAttributes redirect) {
    Staff staff = staffService.findBystaffCode(staffCode);
    if (staff == null) {
      redirect.addFlashAttribute(AdminUserAttribute.STAFF_VALIDATION, 
          AdminUserMessage.STAFF_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    staffService.showStaff(staff);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  
  /** .
   * @description: create new store or save edit store 
   * @author: VDHoan
   * @date_created: Dec 28, 2017
   * @param storeForm .
   * @param result .
   * @param redirect .
   * @return
   */
  @PostMapping(AdminUserUrl.CREATE_STORE)
  public String createStore(@Valid @ModelAttribute(AdminUserAttribute.STORE_FORM)
      StoreForm storeForm, BindingResult result, RedirectAttributes redirect) {
    if (result.hasErrors() || currentItems.size() == 0) {
      redirect.addFlashAttribute(AdminUserAttribute.STORE_VALIDATION, 
          AdminUserMessage.STORE_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    storeForm.setItems(currentItems);
    storeService.save(storeForm);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: Hide store.
   * @author: VDHoan
   * @date_created: Dec 28, 2017
   * @param storeCode .
   * @param redirect .
   * @return
   */
  @GetMapping(AdminUserUrl.HIDE_STORE)
  public String hideStore(@RequestParam String storeCode, RedirectAttributes redirect) {
    Store store = storeService.findBystoreCode(storeCode);
    if (store == null) {
      redirect.addFlashAttribute(AdminUserAttribute.STORE_VALIDATION, 
          AdminUserMessage.STORE_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    storeService.hideStore(store);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: Show Store.
   * @author: VDHoan
   * @date_created: Dec 28, 2017
   * @param storeCode .
   * @param redirect .
   * @return
   */
  @GetMapping(AdminUserUrl.SHOW_STORE)
  public String showStore(@RequestParam String storeCode, RedirectAttributes redirect) {
    Store store = storeService.findBystoreCode(storeCode);
    if (store == null) {
      redirect.addFlashAttribute(AdminUserAttribute.STORE_VALIDATION, 
          AdminUserMessage.STORE_VALIDATION);
      return AdminUserReturn.REDIRECT_ADMIN_USER;
    }
    storeService.showStore(store);
    return AdminUserReturn.REDIRECT_ADMIN_USER;
  }
  
  /** .
   * @description: get remain roles when create/update store
   * @author: VDHoan
   * @date_created: Jan 4, 2018
   * @return
   */
  @PostMapping(AdminUserUrl.GET_REMAIN_ITEMS)
  @ResponseBody
  public Response getRemainItems() {
    if (sizeOfCurrentItem > currentItems.size() || remainItems.isEmpty()) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    remainItems.removeAll(currentItems);
    sizeOfCurrentItem++;
    return new Response(AdminUserMessage.SET_LIST_OK,remainItems);
  }
  
  /** .
   * @description: Get old items for edit store.
   * @author: VDHoan
   * @date_created: Jan 4, 2018
   * @param storeCode .
   * @return
   */
  @PostMapping(AdminUserUrl.GET_OLD_ITEMS)
  @ResponseBody
  public Response getOldItems(@RequestBody String storeCode) {
    Store s = storeService.findOneInList(listStore, 
        storeCode.substring(1, storeCode.length() - 1));
    if (s == null) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    currentItems = s.getItems();
    remainItems = new ArrayList<>(itemsFound);
    remainItems.removeAll(currentItems);
    sizeOfCurrentItem = currentItems.size() + 1;
    return new Response(AdminUserMessage.SET_LIST_OK, currentItems, remainItems);
  }
  
  /** .
   * @description: save one item when choose for store.
   * @author: VDHoan
   * @date_created: Jan 4, 2018
   * @param itemCode .
   * @return
   */
  @PostMapping(AdminUserUrl.SAVE_ONE_ITEM)
  @ResponseBody
  public Response saveOneItem(@RequestBody String itemCode) {
    Item i = itemService.findOneFromList(itemsFound, itemCode.substring(1, itemCode.length() - 1));
    if (i == null) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    currentItems.add(i);
    remainItems.remove(i);
    return new Response(AdminUserMessage.SET_LIST_OK);
  }
  
  /** .
   * @description: delete one item when choose for store.
   * @author: VDHoan
   * @date_created: Jan 4, 2018
   * @param itemCode .
   * @return
   */
  @PostMapping(AdminUserUrl.DELETE_ONE_ITEM)
  @ResponseBody
  public Response deleteOneItem(@RequestBody String itemCode) {
    Item i = itemService.findOneFromList(itemsFound, itemCode.substring(1, itemCode.length() - 1));
    if (i == null) {
      return new Response(RandomStringUtils.random(10, Constant.RANDOM_STRING));
    }
    currentItems.remove(i);
    remainItems.add(i);
    sizeOfCurrentItem--;
    return new Response(AdminUserMessage.SET_LIST_OK);
  }
}