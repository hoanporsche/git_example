package ds.util;

import java.util.Date;
//import java.util.Scanner;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.util.StringUtils;

public class OrderUtil {

  /** .
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 23, 2017
   * @return
   */
  public String materialCode() {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        + "0123456789~`!@#$%^&*()-_=+[{]}\\|;:\\,<.>/?";
    String pwd = RandomStringUtils.random(10, characters);
    return pwd;
  }
  
  /**.
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 23, 2017
   * @param string .
   * @return
   */
  public boolean isNumberic(String string) {
    int i = 0;
    if (!StringUtils.isEmpty(string)) {
      try {
        i = Integer.parseInt(string);
      } catch (Exception e) {
        return false;
      }
    }
    if (i == 0) {
      return false;
    }
    return true;
  }
  
  /**.
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 23, 2017
   * @param date .
   * @return
   */
  public boolean isRightDate(Date date) {
    long startDate = Long.parseLong(new Date().toString());
    long endDate = Long.parseLong(new Date(new Date().getTime() + 1000 * 60 * 60 * 36).toString());
    System.out.println(startDate + " " + endDate);
    return true;
  }
}
