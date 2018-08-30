package ds.upgrade.model.json;

import java.io.Serializable;
import java.util.Date;

public class CapchaApiResponse implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private Boolean success;
  private Date challenge_ts;
  private String hostname;

  public CapchaApiResponse() {
  }

  public CapchaApiResponse(Boolean success, Date challenge_ts, String hostname) {
    this.success = success;
    this.challenge_ts = challenge_ts;
    this.hostname = hostname;
  }

  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public Date getChallenge_ts() {
    return challenge_ts;
  }

  public void setChallenge_ts(Date challenge_ts) {
    this.challenge_ts = challenge_ts;
  }

  public String getHostname() {
    return hostname;
  }

  public void setHostname(String hostname) {
    this.hostname = hostname;
  }

  @Override
  public String toString() {
    return "CapchaApiResponse [success=" + success + ", challenge_ts=" + challenge_ts
        + ", hostname=" + hostname + "]";
  }
}
