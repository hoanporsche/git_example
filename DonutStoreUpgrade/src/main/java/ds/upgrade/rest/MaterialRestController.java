/**
 * 
 */
package ds.upgrade.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ds.upgrade.model.Material;
import ds.upgrade.service.MaterialService;
import ds.upgrade.util.Constants;

/**
 * @description: /api/material.
 * @author: VDHoan
 * @created_date: Mar 21, 2018
 * @modifier: User
 * @modifier_date: Mar 21, 2018
 */
@RestController
@RequestMapping(Constants.API_URL.MAIN_API + Constants.MODEL.MATERIAL_MODEL)
public class MaterialRestController {

  @Autowired
  private MaterialService materialService;

  /**
   * @description: /find-all.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @return
   */
  @GetMapping(Constants.API_URL.FIND_ALL)
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
   * @description: /find-one.
   * @author: VDHoan
   * @created_date: Mar 21, 2018
   * @modifier: User
   * @modifier_date: Mar 21, 2018
   * @param id
   * @return
   */
  @GetMapping(Constants.API_URL.FIND_ONE)
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

  /**
   * @description: /find-list.
   * @author: VDHoan
   * @created_date: Mar 26, 2018
   * @modifier: hoan
   * @modifier_date: Mar 26, 2018
   * @param pageable
   * @param enabled
   * @return
   */
  @GetMapping(Constants.API_URL.FIND_LIST)
  public ResponseEntity<?> findList(Pageable pageable,
      @RequestParam(value = Constants.PARAM.ENABLED_PARAM, required = false) String enabled,
      @RequestParam(value = Constants.PARAM.SUPPLY_ID_PARAM, required = false) String supplyId) {
    try {
      Boolean newEnabled = (StringUtils.isEmpty(enabled)) ? null : Boolean.parseBoolean(enabled);
      Long newSupplyId = (StringUtils.isEmpty(supplyId)) ? null : Long.parseLong(supplyId);
      Page<Material> list = materialService.findList(pageable, newEnabled, newSupplyId);
      if (list.getSize() > 0)
        return new ResponseEntity<Page<Material>>(list, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }

  /**
   * @description: /save.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param material
   * @param result
   * @return
   */
  @PostMapping(Constants.API_URL.SAVE)
  public ResponseEntity<?> createOrUpdate(@RequestBody @Validated Material material,
      BindingResult result) {
    try {
      if (result.hasErrors())
        return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
      material = materialService.save(material);
      if (material != null)
        return new ResponseEntity<Material>(material, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NOT_SAVE, HttpStatus.BAD_REQUEST);
  }

  /**
   * @description: /enabled-or-not.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param id
   * @return
   */
  @GetMapping(Constants.API_URL.ENABLED_OR_NOT)
  public ResponseEntity<?> showOrNot(@RequestParam(Constants.PARAM.ID_PARAM) String id) {
    try {
      Long newId = Long.parseLong(id);
      Material material = materialService.enabledOrNot(newId);
      if (material != null)
        return new ResponseEntity<Material>(material, HttpStatus.OK);
    } catch (NumberFormatException e) {
      return new ResponseEntity<String>(Constants.REPONSE.WRONG_INPUT, HttpStatus.NOT_ACCEPTABLE);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NOT_RETRIVE_DATA, HttpStatus.BAD_REQUEST);
  }

  /**
   * @description: /find-by-name.
   * @author: VDHoan
   * @created_date: Mar 27, 2018
   * @modifier: hoan
   * @modifier_date: Mar 27, 2018
   * @param name
   * @return
   */
  @GetMapping(Constants.API_URL.FIND_BY_NAME)
  public ResponseEntity<?> findByName(@RequestParam(Constants.PARAM.NAME_PARAM) String name) {
    try {
      Material material = materialService.findByName(name);
      if (material != null)
        return new ResponseEntity<Material>(material, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>(Constants.REPONSE.ERROR_SERVER,
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<String>(Constants.REPONSE.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}