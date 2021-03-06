package ds.serviceimpl;

import ds.model.Quantity;
import ds.repository.QuantityRepository;
import ds.service.QuantityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuantityServiceImpl implements QuantityService {
  @Autowired
  private QuantityRepository quantityRepository;

  @Override
  public Iterable<Quantity> findAll() {
    return quantityRepository.findAll();
  }

  @Override
  public void save(Quantity quantity) {
    quantityRepository.save(quantity);
  }

  @Override
  public void delete(int id) {
    quantityRepository.delete(id);
  }

  @Override
  public Quantity findOne(int id) {
    return quantityRepository.findOne(id);
  }

}
