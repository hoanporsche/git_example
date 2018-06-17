/**
 * 
 */
package ds.upgrade.rest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Material;
import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.model.User;
import ds.upgrade.service.MaterialDailyReportService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstants;

/**
 * @description: /api/material-daily-report.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(AppConstants.API_URL.MAIN_API + AppConstants.MODEL.MATERIAL_DAILY_REPORT_MODEL)
public class MaterialDailyReportRestController {

  @Autowired
  private MaterialDailyReportService materialDailyReportService;
  @Autowired
  private UserService userService;

  /**
   * @description: /find-list.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(AppConstants.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable,
      @RequestParam(value = AppConstants.PARAM.NAME_PARAM, required = false) String storeName,
      @RequestParam(value = AppConstants.PARAM.MATERIAL_ID_PARAM, required = false) String materialId,
      @RequestParam(value = AppConstants.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstants.PARAM.END_DATE_PARAM, required = false) String endDate) {
    try {
      String newStoreName = setStoreCorrespondingUserRequested(storeName);
      SimpleDateFormat format = new SimpleDateFormat(AppConstants.FORMAT.DATE_TIME_FORMAT_1);
      Long newMaterialId = (StringUtils.isEmpty(materialId)) ? null : Long.parseLong(materialId);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      Page<MaterialDailyReport> list = materialDailyReportService.findList(newStoreName,
          newMaterialId, newStartDate, newEndDate, pageable);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<MaterialDailyReport>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /find-one.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @GetMapping(AppConstants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(AppConstants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      MaterialDailyReport materialDailyReport = materialDailyReportService.findOne(newId);
      if (materialDailyReport != null)
        return new ResponseEntity<MaterialDailyReport>(materialDailyReport, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 3, 2018
   * @modifier: User
   * @modifier_date: Apr 3, 2018
   * @param storeId
   * @param dateCreated
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @GetMapping(AppConstants.API_URL.FIND_DAILY_REPORT)
  public ResponseEntity<?> findDailyReport(
      @RequestParam(value = AppConstants.PARAM.NAME_PARAM, required = false) String storeName,
      @RequestParam(value = AppConstants.PARAM.DATE_CREATED_PARAM, required = false) String dateCreated) {
    try {
      String newDateCreated;
      SimpleDateFormat dateFormat = new SimpleDateFormat(AppConstants.FORMAT.DATE_FORMAT_1);
      // Default dateCreated value is today.
      if (StringUtils.isEmpty(dateCreated)) {
        newDateCreated = dateFormat.format(new Date()).toString();
      } else {
        newDateCreated = dateFormat.format(dateFormat.parse(dateCreated)).toString();
      }
      String newStoreName = setStoreCorrespondingUserRequested(storeName);
      List<MaterialDailyReport> list = materialDailyReportService.findDailyReport(newDateCreated,
          newStoreName);
      if (list.size() > 0) {
        return new ResponseEntity<List<MaterialDailyReport>>(list, HttpStatus.OK);
      }
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Apr 5, 2018
   * @modifier: User
   * @modifier_date: Apr 5, 2018
   * @param listReport
   * @param result
   * @return
   */
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  @PostMapping(AppConstants.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(
      @RequestBody @Validated List<MaterialDailyReport> listReport, BindingResult result,
      @RequestParam(value = AppConstants.PARAM.NAME_PARAM) String storeName) {
    try {
      if (result.hasErrors() || checkDuplicateMaterial(listReport))
        return new ResponseEntity<String>(AppConstants.REPONSE.WRONG_INPUT + result.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
      String newStoreName = setStoreCorrespondingUserRequested(storeName);
      listReport = materialDailyReportService.save(listReport, newStoreName);
      if (listReport != null)
        return new ResponseEntity<List<MaterialDailyReport>>(listReport, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstants.REPONSE.NOT_SAVE, HttpStatus.BAD_REQUEST);
  }

  private boolean checkDuplicateMaterial(List<MaterialDailyReport> listReport) {
    Vector<Material> v = new Vector<>();
    for (int i = 0; i < listReport.size(); i++) {
      if (v.contains(listReport.get(i).getMaterialId())) {
        return true;
      }
      v.add(listReport.get(i).getMaterialId());
    }
    return false;
  }
  
  private String setStoreCorrespondingUserRequested(String storeName) {
    User user = userService.findInfoUser();
    String newStoreName = null;
    // Admin can overwatch all material daily reports and Store have just overwatch
    // all material daily reports belong to their store.
    if (userService.isAdmin(user.getRoles())) {
      newStoreName = (StringUtils.isEmpty(storeName)) ? newStoreName : storeName; 
    } else {
      newStoreName = user.getStoreId().getName();
    }
    return newStoreName;
  }
}
