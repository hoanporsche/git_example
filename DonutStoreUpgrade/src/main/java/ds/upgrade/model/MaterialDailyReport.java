/**
 * 
 */
package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 6, 2018
 * @modifier: User
 * @modifier_date: Mar 6, 2018
 */
@Entity
@Table(name = "material_daily_report")
public class MaterialDailyReport implements Serializable {

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 6, 2018
   * @modifier: User
   * @modifier_date: Mar 6, 2018
   */
  private static final long serialVersionUID = 4197942078910386097L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "store_id", referencedColumnName = "id")
  private Store storeId;
  
  @JsonFormat(pattern = "MM/dd/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_created")
  private Date dateCreated;
  
  @OneToMany(mappedBy = "materialDailyReportId")
  private List<MaterialReport> listMaterialReport;
  
  public MaterialDailyReport() {}
  
  public MaterialDailyReport(Long id) {
    this.id = id;
  }
  
  public MaterialDailyReport(Long id, Store storeId, Date dateCreated) {
    super();
    this.id = id;
    this.storeId = storeId;
    this.dateCreated = dateCreated;
  }

  public String toString() {
    return "Material daily report";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Store getStoreId() {
    return storeId;
  }

  public void setStoreId(Store storeId) {
    this.storeId = storeId;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public List<MaterialReport> getListMaterialReport() {
    return listMaterialReport;
  }

  public void setListMaterialReport(List<MaterialReport> listMaterialReport) {
    this.listMaterialReport = listMaterialReport;
  }

}
