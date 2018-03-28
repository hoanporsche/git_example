package ds.upgrade.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @description: 
 * @author: VDHoan
 * @date_created: Mar 6, 2018
 */
@Entity
@Table(name = "timekeeping_status")
public class TimekeepingStatus implements Serializable {

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
  @Size(max = 255)
  @Column(name = "tilte", nullable = false)
  private String title;
  @Size(max = 255)
  @Column(name = "desciption")
  private String description;
  @Column(name = "enabled", nullable = false)
  private boolean enabled;
  
  @OneToMany(cascade = CascadeType.ALL,mappedBy = "statusId")
  @JsonIgnore
  private List<Timekeeping> timekeepings;
  
  public TimekeepingStatus() {}
  
  public TimekeepingStatus(Long id) {
    this.id = id;
  }
  
  public String toString() {
    return this.title;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public List<Timekeeping> getTimekeepings() {
    return timekeepings;
  }

  public void setTimekeepings(List<Timekeeping> timekeepings) {
    this.timekeepings = timekeepings;
  }
}
