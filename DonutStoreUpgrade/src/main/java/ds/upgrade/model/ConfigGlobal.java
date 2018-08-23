package ds.upgrade.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "config_global")
public class ConfigGlobal implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;

  @Id
  @Column(name = "name", nullable = false, unique = true)
  @NotEmpty
  @Size(max = 60)
  private String name;
  @NotEmpty
  @Size(max = 255)
  @Column(name = "value", nullable = false, unique = false)
  private String value;

  public ConfigGlobal() {
  }

  public ConfigGlobal(String name, String value) {
    this.name = name;
    this.value = value;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

}
