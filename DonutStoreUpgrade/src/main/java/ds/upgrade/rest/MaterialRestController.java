/**
 * 
 */
package ds.upgrade.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Material;
import ds.upgrade.service.MaterialService;
import ds.upgrade.util.Constants;

/**
 * @description: .
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping("/api/material")
public class MaterialRestController {

  @Autowired
  private MaterialService materialService;

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @GetMapping("/find-all")
  public ResponseEntity<?> findAll() {
    try {
      List<Material> list = materialService.findAll();
      if (!list.isEmpty())
        return new ResponseEntity<List<Material>>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: .
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @GetMapping("/find-one")
  public ResponseEntity<?> findOne(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Material material = materialService.findOne(newId);
      if (material != null)
        return new ResponseEntity<Material>(material, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
