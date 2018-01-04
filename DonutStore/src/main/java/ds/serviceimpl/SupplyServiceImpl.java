package ds.serviceimpl;

import ds.model.Supply;
import ds.repository.SupplyRepository;
import ds.service.SupplyService;
import ds.util.Constant;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplyServiceImpl implements SupplyService {

  @Autowired
  private SupplyRepository supplyRepository;
  
  @Override
  public List<Supply> findAll() {
    return (List<Supply>) supplyRepository.findAll();
  }

  @Override
  public List<Supply> findAllByStatus() {
    List<Supply> listSupply = (List<Supply>) supplyRepository.findAll();
    for (int i = 0; i < listSupply.size(); i++) {
      if (listSupply.get(i).isSupplyStatus() == false) {
        listSupply.remove(listSupply.get(i));
      }
    }
    return listSupply;
  }

  @Override
  public void save(Supply supply) {
    if (StringUtils.isEmpty(supply.getSupplyCode())) {
      supply.setSupplyCode(RandomStringUtils.random(10, Constant.RANDOM_STRING_BASIC));
      supply.setSupplyDateCreated(new Date());
    } else {
      Supply s = supplyRepository.findBysupplyCode(supply.getSupplyCode());
      supply.setSupplyId(s.getSupplyId());
      supply.setSupplyCode(s.getSupplyCode());
      supply.setSupplyDateCreated(s.getSupplyDateCreated());
    }
    supply.setSupplyDateUpdated(new Date());
    supply.setSupplyStatus(true);
    supplyRepository.save(supply);
    
  }

  @Override
  public void hide(Supply supply) {
    supply.setSupplyStatus(false);
    supply.setSupplyDateUpdated(new Date());
    supplyRepository.save(supply);
  }

  @Override
  public void show(Supply supply) {
    supply.setSupplyStatus(true);
    supply.setSupplyDateUpdated(new Date());
    supplyRepository.save(supply);
  }

  @Override
  public Supply findBysupplyCode(String supplyCode) {
    return supplyRepository.findBysupplyCode(supplyCode);
  }

}
