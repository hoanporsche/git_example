package ds.upgrade.util;

import java.math.BigInteger;

public class UIUtil {
  public static String formatNumber(BigInteger number) {
    return String.format("%,d", number);
  }
}
