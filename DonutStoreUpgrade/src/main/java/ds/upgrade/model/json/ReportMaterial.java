package ds.upgrade.model.json;

import java.io.Serializable;

public class ReportMaterial implements Serializable {

  private static final long serialVersionUID = 4197942078910386097L;
  private String name;
  private Integer totalIn;

  public ReportMaterial(String name, Integer totalIn) {
    super();
    setName(name);
    setTotalIn(totalIn);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getTotalIn() {
    return totalIn;
  }

  public void setTotalIn(Integer totalIn) {
    this.totalIn = totalIn == null ? 0 : totalIn;
  }

}
