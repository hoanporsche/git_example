import { Component, OnInit, OnDestroy } from '@angular/core';
import { sortByProperty } from '../../../../shared/helpers/data.helper';
import { Subscription } from 'rxjs/Subscription';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { MaterialService } from '../../service/material.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { Material } from '../../material';
import { Supply } from '../../../supply/supply';
import { SupplyService } from '../../../supply/service/supply.service';

declare var $:any;
@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit, OnDestroy {

  listMaterial: Material[];
  oldMaterial: Material;
  listSupply: Supply[];

  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  params = {
    enabled: '',
    supplyId: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }
  enabled = [
    { view: 'Active', value: 'true' },
    { view: 'In-Active', value: 'false' }
  ]
  private subListMaterial: Subscription;
  private subSortService: Subscription;
  private subMaterial: Subscription;
  private subListSupply: Subscription;

  constructor(private materialService: MaterialService,
    private supplyService: SupplyService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
    this.subListSupply = this.supplyService.findAll()
      .subscribe(response => {
        this.listSupply = response;
      })
  }

  ngOnDestroy(): void {
    if (this.subListMaterial)
      this.subListMaterial.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subMaterial)
      this.subMaterial.unsubscribe();
    if (this.subListSupply)
      this.subListSupply.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListMaterial = this.materialService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listMaterial = response.content;
        if (this.listMaterial.length === 0) {
          this.notFoundMessage = "We're not found any contents";
        } else {
          this.notFoundMessage = "";
        }
        this.requestPage = response;
      }, (error: Error) => {
        this.error.isError = true;
        this.error.message = error.message;
      })
  }

  sort(property: string) {
    if (this.currentSortProperty === '') {
      this.currentSortProperty = property;
    }
    if (this.currentSortProperty !== property) {
      this.sortDirection = 0;
      this.currentSortProperty = property;
    }
    this.sortDirection = (this.sortDirection === 0) ? 1 : (this.sortDirection === 1) ? -1 : 0;
    this.listMaterial.sort(sortByProperty(property, this.sortDirection));
  }

  first() {
    if (!this.requestPage.first) {
      this.params.page = 0;
      this.findList();
    }
  }

  prev() {
    if (!this.requestPage.first) {
      this.params.page = this.requestPage.number - 1;
      this.findList();
    }

  }

  next() {
    if (!this.requestPage.last) {
      this.params.page = this.requestPage.number + 1;
      this.findList();
    }
  }

  last() {
    if (!this.requestPage.last) {
      this.params.page = this.requestPage.totalPages - 1;
      this.findList();
    }
  }

  openModal() {
    $('#modal_add_material').modal({ show: true, backdrop: 'static' });
  }

  materialSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add_material').modal('toggle');
    }
  }

  materialUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update_material').modal('toggle');
    }
  }

  onDetail(material) {
    this.oldMaterial = material;
    this.materialService.setMaterial(JSON.parse(JSON.stringify(material)));
    $('#modal_update_material').modal({ show: true, backdrop: 'static' });
  }

  onEnabledOrNot(id) {
    this.subMaterial = this.materialService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
