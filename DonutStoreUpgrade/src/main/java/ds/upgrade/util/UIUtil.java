package ds.upgrade.util;

import java.math.BigInteger;

public class UIUtil {
  public static String formatNumber(Long number) {
	  
    return String.format("%,d",BigInteger.valueOf(number));
  }
}
