package ds.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "supply")
public class Supply implements Serializable {

  private static final long serialVersionUID = 1L;

  
  private int supplyId;
  private String supplyCode;
  private String supplyName;
  private String supplyPhone;
  private String supplyAddress;
  private Date supplyDateCreated;
  private Date supplyDateUpdated;
  private boolean supplyStatus;
  
  @OneToMany(mappedBy = "materialSupply")
  @JsonIgnore
  private List<Material> materials;
  
  public String toString() {
    return this.supplyName + "," + this.supplyAddress;
  }
}
