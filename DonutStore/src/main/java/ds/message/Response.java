package ds.message;

public class Response {

  private String status;
  private Object data;
  private Object data2;
  
  public String toString() {
    return this.status;
  }

  public Response() {
  }

  public Response(String status) {
    this.status = status;
  }

  public Response(String status, Object data) {
    this.status = status;
    this.data = data;
  }
  
  /** .
   * @description: constructor.
   * @author: VDHoan
   * @date_created: Dec 20, 2017
   * @param status .
   * @param data .
   * @param data2 .
   */
  public Response(String status, Object data, Object data2) {
    this.status = status;
    this.data = data;
    this.data2 = data2;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }

  public Object getData2() {
    return data2;
  }

  public void setData2(Object data2) {
    this.data2 = data2;
  }

}
