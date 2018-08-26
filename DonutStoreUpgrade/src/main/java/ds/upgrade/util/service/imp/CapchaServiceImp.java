package ds.upgrade.util.service.imp;

import java.net.URI;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import ds.upgrade.model.json.CapchaApiResponse;
import ds.upgrade.util.AppConstant;
import ds.upgrade.util.service.CapchaService;

@Service
public class CapchaServiceImp implements CapchaService {

  @Autowired
  private RestTemplate restTemplate;

  @Override
  public Boolean checkCapcha(String uvresp, HttpServletRequest request)
      throws HttpStatusCodeException {
    try {
      String ipAddress = this.getIpAddress(request);
      URI verifyUri = URI.create(String.format(AppConstant.CAPCHA.URL_SERVER_VERIFY_FORMAT,
          AppConstant.CAPCHA.CAPCHA_SECRET, uvresp, ipAddress));
      CapchaApiResponse capchaApiResponse = restTemplate.getForObject(verifyUri,
          CapchaApiResponse.class);
      return capchaApiResponse.getSuccess();
    } catch (HttpStatusCodeException e) {
      throw e;
    }
  }

  @Override
  public String getIpAddress(HttpServletRequest request) {
    String remoteAddr = null;

    if (request != null) {
      remoteAddr = request.getHeader("X-FORWARDED-FOR");
      if (remoteAddr == null || "".equals(remoteAddr)) {
        remoteAddr = request.getRemoteAddr();
      }
    }

    return remoteAddr;
  }

}
