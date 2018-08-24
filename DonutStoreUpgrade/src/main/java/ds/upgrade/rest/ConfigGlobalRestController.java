package ds.upgrade.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.ConfigGlobal;
import ds.upgrade.service.ConfigGlobalService;
import ds.upgrade.util.AppConstant;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.CONFIG_GLOBAL_MODEL)
public class ConfigGlobalRestController {

  @Autowired
  private ConfigGlobalService configGlobalService;

  @GetMapping(AppConstant.API_URL.FIND_ALL)
  public ResponseEntity<?> findAll() {
    try {
      List<ConfigGlobal> list = configGlobalService.findAll();
      if (list == null)
        return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
      return new ResponseEntity<List<ConfigGlobal>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + " " + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PostMapping(AppConstant.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated ConfigGlobal cg, BindingResult result) {
    try {
      if (result.hasErrors())
        return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      cg = configGlobalService.createOrUpdate(cg);
      if (cg == null)
        return new ResponseEntity<String>(AppConstant.REPONSE.NOT_SAVE, HttpStatus.NOT_MODIFIED);
      return new ResponseEntity<ConfigGlobal>(cg, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + " " + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PostMapping(AppConstant.API_URL.DELETE)
  public ResponseEntity<?> delete(@RequestBody @Validated ConfigGlobal cg, BindingResult result) {
    try {
      if (result.hasErrors())
        return new ResponseEntity<String>(AppConstant.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      return new ResponseEntity<Boolean>(configGlobalService.delete(cg), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER + " " + e.getMessage(),
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
