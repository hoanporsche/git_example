package ds.controller;

import ds.message.Response;
import ds.model.Customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainRestController {

  List<Customer> cust = new ArrayList<Customer>();

  @GetMapping(value = "/all")
  public @ResponseBody Response getResource() {
    Response response = new Response("Done", cust);
    return response;
  }

  /** .
   * @description: 
   * @author: VDHoan
   * @date_created: Dec 23, 2017
   * @param customer .
   * @return
   */
  @PostMapping("/save")
  public @ResponseBody Response postCustomer(@RequestBody Customer customer) {
    cust.add(customer);
    // Create Response Object
    Response response = new Response("Done", customer);
    return response;
  }
}
