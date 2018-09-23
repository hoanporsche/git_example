package ds.upgrade.rest;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Order;
import ds.upgrade.model.User;
import ds.upgrade.model.json.OrderReportJson;
import ds.upgrade.service.ReportService;
import ds.upgrade.service.UserService;
import ds.upgrade.util.AppConstant;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.REPORT_MODEL)
public class ReportRestController {

  @Autowired
  private ReportService reportService;
  @Autowired
  private UserService userService;

  @GetMapping("/order/counting-info")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  public ResponseEntity<?> coutingInfomation(
      @RequestParam(value = AppConstant.PARAM.STORE_CODE_PARAM, required = false) String storeCode,
      @RequestParam(value = AppConstant.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstant.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = AppConstant.PARAM.RANGE_TIME_PARAM, required = false) String rangeTime) {
    try {
      User user = userService.findInfoUser();
      String newStoreCode;
      // Admin can overwatch all quantites and Store have just overwatch all
      // quantities belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreCode = user.getStoreId().getCode();
      } else {
        newStoreCode = storeCode;
      }
      SimpleDateFormat format = new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      OrderReportJson orderReportJson = reportService.countingInfomation(newStoreCode, newStartDate,
          newEndDate, rangeTime);

      if (orderReportJson != null)
        return new ResponseEntity<OrderReportJson>(orderReportJson, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  @GetMapping("/order/find-list")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STORE')")
  public ResponseEntity<?> findList(Pageable pageable,
      @RequestParam(value = AppConstant.PARAM.STORE_CODE_PARAM, required = false) String storeCode,
      @RequestParam(value = AppConstant.PARAM.START_DATE_PARAM, required = false) String startDate,
      @RequestParam(value = AppConstant.PARAM.END_DATE_PARAM, required = false) String endDate,
      @RequestParam(value = AppConstant.PARAM.RANGE_TIME_PARAM, required = false) String rangeTime) {
    try {
      User user = userService.findInfoUser();
      String newStoreCode;
      // Admin can overwatch all quantites and Store have just overwatch all
      // quantities belong to their store.
      if (userService.isStore(user.getRoles())) {
        newStoreCode = user.getStoreId().getCode();
      } else {
        newStoreCode = storeCode;
      }
      SimpleDateFormat format = new SimpleDateFormat(AppConstant.FORMAT.DATE_TIME_FORMAT_1);
      Date newStartDate = (StringUtils.isEmpty(startDate)) ? null
          : format.parse(startDate + " 00:00:00");
      Date newEndDate = (StringUtils.isEmpty(endDate)) ? null : format.parse(endDate + " 23:59:59");
      Page<Order> list = reportService.findListOrder(newStoreCode, newStartDate, newEndDate,
          rangeTime, pageable);

      if (list.getSize() > 0)
        return new ResponseEntity<Page<Order>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return new ResponseEntity<String>(AppConstant.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
