package ds.upgrade.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.support.Sender;
import ds.upgrade.service.SenderDbService;
import ds.upgrade.util.AppConstant;

@RestController
@RequestMapping(AppConstant.API_URL.MAIN_API + AppConstant.MODEL.SENDER_DB_MODEL)
public class SenderDbRestController {

  @Autowired
  private SenderDbService senderDbService;

  @GetMapping(AppConstant.API_URL.FIND_ALL_INTERNAL)
  public ResponseEntity<?> findAllInternal() {
    try {
      List<Sender> list = senderDbService.findAllInternal();
      if (list != null)
        return new ResponseEntity<List<Sender>>(list, HttpStatus.OK);
      return new ResponseEntity<String>(AppConstant.REPONSE.NO_CONTENT, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(AppConstant.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
