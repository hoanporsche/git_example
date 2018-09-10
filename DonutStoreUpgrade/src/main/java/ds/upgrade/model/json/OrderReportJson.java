package ds.upgrade.model.json;

import java.io.Serializable;

public class OrderReportJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private int totalOrder;
  private int totalShipping;
  private int totalNotShipping;
  private String totalShippingPrice;
  private String totalInbound;

  public String getTotalShippingPrice() {
    return totalShippingPrice;
  }

  public void setTotalShippingPrice(String totalShippingPrice) {
    this.totalShippingPrice = totalShippingPrice;
  }

  public String getTotalInbound() {
    return totalInbound;
  }

  public void setTotalInbound(String totalInbound) {
    this.totalInbound = totalInbound;
  }

  public int getTotalOrder() {
    return totalOrder;
  }

  public void setTotalOrder(int totalOrder) {
    this.totalOrder = totalOrder;
  }

  public int getTotalShipping() {
    return totalShipping;
  }

  public void setTotalShipping(int totalShipping) {
    this.totalShipping = totalShipping;
  }

  public int getTotalNotShipping() {
    return totalNotShipping;
  }

  public void setTotalNotShipping(int totalNotShipping) {
    this.totalNotShipping = totalNotShipping;
  }
}
