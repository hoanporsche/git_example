package ds.upgrade.model.json;

import java.io.Serializable;

public class OrderReportJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private Long totalOrder;
  private int totalShipping;
  private int totalNotShipping;
  private Long totalShippingPrice;
  private Long totalInbound;

  public OrderReportJson() {
  }

  public OrderReportJson(Long totalOrder, Long totalShippingPrice, Long totalInbound) {
    super();
    this.totalOrder = totalOrder;
    this.totalShippingPrice = totalShippingPrice;
    this.totalInbound = totalInbound;
  }

  public OrderReportJson(Long totalOrder, int totalShipping, int totalNotShipping,
      Long totalShippingPrice, Long totalInbound) {
    this.totalOrder = totalOrder;
    this.totalShipping = totalShipping;
    this.totalNotShipping = totalNotShipping;
    this.totalShippingPrice = totalShippingPrice;
    this.totalInbound = totalInbound;
  }

  public Long getTotalShippingPrice() {
    return totalShippingPrice;
  }

  public void setTotalShippingPrice(Long totalShippingPrice) {
    this.totalShippingPrice = totalShippingPrice;
  }

  public Long getTotalInbound() {
    return totalInbound;
  }

  public void setTotalInbound(Long totalInbound) {
    this.totalInbound = totalInbound;
  }

  public Long getTotalOrder() {
    return totalOrder;
  }

  public void setTotalOrder(Long totalOrder) {
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
