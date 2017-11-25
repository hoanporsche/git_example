package ds.util;

import java.util.Date;
//import java.util.Scanner;

import org.springframework.util.StringUtils;

public class OrderUtil {
//  public static void main(String[] args) {
//    OrderUtil ou = new OrderUtil();
//    Scanner sc = new Scanner(System.in);
//    do {
//      System.out.println("nhap ki tu");
//      String s = sc.nextLine();
//      if(ou.isNumberic(s)) {
//        System.out.println("Number");
//      } else {
//        System.out.println("String");
//      }
//    } while(true);
//  }
  
  public boolean isNumberic(String string) {
    int i = 0;
    if(!StringUtils.isEmpty(string)) {
      try {
        i = Integer.parseInt(string);
      } catch (Exception e) {
        return false;
      }
    }
    if(i == 0) {
      return false;
    }
    return true;
  }
  
  public boolean isRightDate(Date date) {
    long startDate = Long.parseLong(new Date().toString());
    long endDate = Long.parseLong(new Date(new Date().getTime()+ 1000*60*60*36).toString());

    return true;
  }
}
