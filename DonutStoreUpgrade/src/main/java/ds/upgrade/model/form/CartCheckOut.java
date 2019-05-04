package ds.upgrade.model.form;

import java.io.Serializable;
import java.util.List;

public class CartCheckOut implements Serializable {
	private static final long serialVersionUID = 4197942078910386097L;
	
	private List<QuantityForm> quantities;
	private Long totalPrice;
	
	public List<QuantityForm> getQuantities() {
		return quantities;
	}
	public void setQuantities(List<QuantityForm> quantities) {
		this.quantities = quantities;
	}
	public Long getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}
	@Override
	public String toString() {
		return "CartCheckOut [totalPrice=" + totalPrice + "]";
	}
	
	
}
