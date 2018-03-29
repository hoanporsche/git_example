package ds.upgrade.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "material")
public class Material implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;

  @Size(max = 255)
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Size(max = 255)
  @Column(name = "picture")
  private String picture;

  @ManyToOne
  @JoinColumn(name = "supply_id", referencedColumnName = "id", nullable = false)
  private Supply supplyId;

  @Column(name = "date_created", nullable = false)
  private Date dateCreated;

  @Column(name = "date_updated", nullable = false)
  private Date dateUpdated;

  @Column(name = "single_value", nullable = false)
  private BigDecimal singleValue;

  @Column(name = "enabled", nullable = true)
  private boolean enabled;

  @ManyToMany(mappedBy = "materials")
  @JsonIgnore
  private Set<Item> items;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "materialId")
  @JsonIgnore
  private List<MaterialDailyReport> reports;

  public Material() {
  }
  
  public String toString() {
    return this.name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public Supply getSupplyId() {
    return supplyId;
  }

  public void setSupplyId(Supply supplyId) {
    this.supplyId = supplyId;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateUpdated() {
    return dateUpdated;
  }

  public void setDateUpdated(Date dateUpdated) {
    this.dateUpdated = dateUpdated;
  }

  public BigDecimal getSingleValue() {
    return singleValue;
  }

  public void setSingleValue(BigDecimal singleValue) {
    this.singleValue = singleValue;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public Set<Item> getItems() {
    return items;
  }

  public void setItems(Set<Item> items) {
    this.items = items;
  }

  public List<MaterialDailyReport> getReports() {
    return reports;
  }

  public void setReports(List<MaterialDailyReport> reports) {
    this.reports = reports;
  }

}
