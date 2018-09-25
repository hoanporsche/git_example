package ds.upgrade.model.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ReportOrderJson implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private Long totalOrder;
  private int totalShipping;
  private int totalNotShipping;
  private Long totalShippingPrice;
  private Long totalInbound;
  private List<ReportQuantityJson> reportQuantityJsons = new ArrayList<>();
  public ReportOrderJson() {
  }

  public ReportOrderJson(Long totalOrder, Long totalShippingPrice, Long totalInbound) {
    super();
    this.totalOrder = totalOrder;
    this.totalShippingPrice = totalShippingPrice;
    this.totalInbound = totalInbound;
  }

  public ReportOrderJson(Long totalOrder, int totalShipping, int totalNotShipping,
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

  public List<ReportQuantityJson> getReportQuantityJsons() {
    return reportQuantityJsons;
  }

  public void setReportQuantityJsons(List<ReportQuantityJson> reportQuantityJsons) {
    this.reportQuantityJsons = reportQuantityJsons;
  }
}
