package ds.upgrade.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Oct 9, 2018
 * @modifier: User
 * @modifier_date: Oct 9, 2018
 */
@Entity
@Table(name = "material_report")
public class MaterialReport implements Serializable {
  private static final long serialVersionUID = 4197942078910386097L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;
  
  @ManyToOne
  @JoinColumn(name = "material_daily_report_id", referencedColumnName = "id",nullable = false)
  @JsonIgnore
  private MaterialDailyReport materialDailyReportId;
  @ManyToOne
  @JoinColumn(name = "material_id", referencedColumnName = "id",nullable = false)
  private Material materialId;
  
  @NotNull
  @Column(name = "remain")
  private int remain;
  
  @NotNull
  @Column(name = "in")
  private int in;
  
  @Column(name = "description")
  private String description;

  @Override
  public String toString() {
    return "MaterialReport [materialCode=" + materialId + ", remain=" + remain + ", in=" + in
        + "]";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public MaterialDailyReport getMaterialDailyReportId() {
    return materialDailyReportId;
  }

  public void setMaterialDailyReportId(MaterialDailyReport materialDailyReportId) {
    this.materialDailyReportId = materialDailyReportId;
  }

  public Material getMaterialId() {
    return materialId;
  }

  public void setMaterialId(Material materialId) {
    this.materialId = materialId;
  }

  public int getRemain() {
    return remain;
  }

  public void setRemain(int remain) {
    this.remain = remain;
  }

  public int getIn() {
    return in;
  }

  public void setIn(int in) {
    this.in = in;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
