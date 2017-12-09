package ds.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ds.message.Response;
import ds.model.Customer;

@RestController
public class MainRestController {

	List<Customer> cust = new ArrayList<Customer>();
	
	@GetMapping(value = "/all")
	public Response getResource() {
		Response response = new Response("Done",cust);
		return response;
	}
	
	@PostMapping("/save")
	public Response postCustomer(@RequestBody Customer customer) {
		cust.add(customer);
		//Create Response Object
		Response response = new Response("Done",customer);
		return response;
	}
}
