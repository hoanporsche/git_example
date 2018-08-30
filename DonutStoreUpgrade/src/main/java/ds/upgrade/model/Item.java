package ds.upgrade.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "item")
public class Item implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Size(min = 10, max = 10)
  @Column(name = "code", nullable = false, unique = true)
  private String code;
  @NotEmpty
  @Size(max = 40)
  @Column(name = "name", nullable = false, unique = true)
  private String name;
  @Size(max = 1000)
  @Column(name = "picture")
  private String picture;

  @ManyToOne
  @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
  private Category categoryId;

  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_created", nullable = false)
  private Date dateCreated;

  @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  @Column(name = "date_updated", nullable = false)
  private Date dateUpdated;
  @NotNull
  @Column(name = "single_value", nullable = false)
  private BigDecimal singleValue;

  @Column(name = "enabled", nullable = false)
  private boolean enabled;

  @Size(max = 1000)
  @Column(name = "description", nullable = false)
  private String description;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "itemId")
  @JsonIgnore
  private List<Quantity> quantites;

  public Item() {
  }

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

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public Category getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Category categoryId) {
    this.categoryId = categoryId;
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

  public List<Quantity> getQuantites() {
    return quantites;
  }

  public void setQuantites(List<Quantity> quantites) {
    this.quantites = quantites;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}
