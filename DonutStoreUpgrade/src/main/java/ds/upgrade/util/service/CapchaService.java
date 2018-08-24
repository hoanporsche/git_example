package ds.upgrade.util.service;

import javax.servlet.http.HttpServletRequest;

public interface CapchaService {
  public Boolean checkCapcha(String uvresp, HttpServletRequest request);
  public String getIpAddress(HttpServletRequest request);
}
