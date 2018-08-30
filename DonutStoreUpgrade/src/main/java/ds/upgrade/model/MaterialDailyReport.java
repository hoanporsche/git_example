/**
 * 
 */
package ds.upgrade.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
  
  @Column(name = "store_id")
  private Long storeId;
  
  @JsonFormat(pattern = "MM/dd/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_created")
  private Date dateCreated;
  
  @ManyToOne
  @JoinColumn(name = "material_id", referencedColumnName = "id",nullable = false)
  private Material materialId;
  
  @NotNull
  @Column(name = "material_remain")
  private int materialRemain;
  
  @NotNull
  @Column(name = "material_import")
  private int materialImport;
  
  @Column(name = "description")
  private String description;
  
  public MaterialDailyReport() {}
  
  public MaterialDailyReport(Long id) {
    this.id = id;
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

  public Long getStoreId() {
    return storeId;
  }

  public void setStoreId(Long storeId) {
    this.storeId = storeId;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Material getMaterialId() {
    return materialId;
  }

  public void setMaterialId(Material materialId) {
    this.materialId = materialId;
  }

  public int getMaterialRemain() {
    return materialRemain;
  }

  public void setMaterialRemain(int materialRemain) {
    this.materialRemain = materialRemain;
  }

  public int getMaterialImport() {
    return materialImport;
  }

  public void setMaterialImport(int materialImport) {
    this.materialImport = materialImport;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}
