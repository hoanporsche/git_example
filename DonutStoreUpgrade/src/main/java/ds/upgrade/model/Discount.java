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
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "discount")
public class Discount implements Serializable {
  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "code", nullable = false, unique = true)
  private String code;
  @NotEmpty
  @Size(max = 20)
  @Column(name = "name", nullable = false, unique = true)
  private String name;
  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_created", nullable = false)
  private Date dateCreated;
  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_updated", nullable = false)
  private Date dateUpdated;
  @Column(name = "enabled", nullable = false)
  private boolean enabled;
  
  @ManyToOne
  @JoinColumn(name = "discount_type_id", referencedColumnName = "id", nullable = false)
  private DiscountType discountTypeId;
  @NotNull
  @Column(name = "range", nullable = false)
  private Long range;
  
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getCode() {
    return code;
  }
  public void setCode(String code) {
    this.code = code;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
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
  public boolean isEnabled() {
    return enabled;
  }
  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }
  public DiscountType getDiscountTypeId() {
    return discountTypeId;
  }
  public void setDiscountTypeId(DiscountType discountTypeId) {
    this.discountTypeId = discountTypeId;
  }
  public Long getRange() {
    return range;
  }
  public void setRange(Long range) {
    this.range = range;
  }
  @Override
  public String toString() {
    return "Discount [code=" + code + ", name=" + name + "]";
  }
}
