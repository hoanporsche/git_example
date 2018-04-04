/**
 * 
 */
package ds.upgrade.rest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.MaterialDailyReport;
import ds.upgrade.model.User;
import ds.upgrade.service.MaterialDailyReportService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.Constants;

/**
 * @description: /api/material-daily-report.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(Constants.API_URL.MAIN_API + Constants.MODEL.MATERIAL_DAILY_REPORT_MODEL)
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
  @GetMapping(Constants.API_URL.FIND_LIST)
  public ResponseEntity<?> findAll(Pageable pageable,
      @RequestParam(value = Constants.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = Constants.PARAM.MATERIAL_ID_PARAM, required = false) String materialId,
      @RequestParam(value = Constants.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = Constants.PARAM.END_DATE_PARAM, required = false) String endDate) {
    try {
      User user = userService.findInfoUser();
      Long newStoreId;
      // Admin can overwatch all material daily reports and Store have just overwatch
      // all material daily reports belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreId = user.getStoreId().getId();
      } else {
        newStoreId = (StringUtils.isEmpty(storeId)) ? null : Long.parseLong(storeId);
      }
      SimpleDateFormat format = new SimpleDateFormat(Constants.FORMAT.DATE_TIME_FORMAT_1);
      Long newMaterialId = (StringUtils.isEmpty(materialId)) ? null : Long.parseLong(materialId);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      Page<MaterialDailyReport> list = materialDailyReportService.findList(newStoreId,
          newMaterialId, newStartDate, newEndDate, pageable);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<MaterialDailyReport>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @GetMapping(Constants.API_URL.FIND_ONE)
  public ResponseEntity<?> findOne(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      MaterialDailyReport materialDailyReport = materialDailyReportService.findOne(newId);
      if (materialDailyReport != null)
        return new ResponseEntity<MaterialDailyReport>(materialDailyReport, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
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
  @GetMapping(Constants.API_URL.FIND_DAILY_REPORT)
  public ResponseEntity<?> findDailyReport(
      @RequestParam(value = Constants.PARAM.STORE_ID_PARAM, required = false) String storeId,
      @RequestParam(value = Constants.PARAM.DATE_CREATED_PARAM, required = false) String dateCreated) {
    try {
      String newDateCreated;
      SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.FORMAT.DATE_FORMAT_1);
      // Default dateCreated value is today.
      if (StringUtils.isEmpty(dateCreated)) {
        newDateCreated = dateFormat.format(new Date()).toString();
      } else {
        newDateCreated = dateFormat.format(dateFormat.parse(dateCreated)).toString();
      }
      User user = userService.findInfoUser();
      Long newStoreId;
      // Admin can overwatch all material daily reports and Store have just overwatch
      // all material daily reports belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreId = user.getStoreId().getId();
      } else {
        newStoreId = Long.parseLong(storeId);
      }
      List<MaterialDailyReport> list = materialDailyReportService.findDailyReport(newDateCreated,
          newStoreId);
      if (list.size() > 0) {
        return new ResponseEntity<List<MaterialDailyReport>>(list, HttpStatus.OK);
      }
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
