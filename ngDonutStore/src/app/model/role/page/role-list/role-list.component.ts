import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from '../../role';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from '../../service/role.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

declare var $:any;
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit, OnDestroy {

  listRole: Role[];
  oldRole: Role;

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
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }
  enabled = [
    { view: 'Active', value: 'true' },
    { view: 'In-Active', value: 'false' }
  ]

  private subListRole: Subscription;
  private subSortService: Subscription;
  private subRole: Subscription;

  constructor(private roleService: RoleService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.listRole = [];
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListRole)
      this.subListRole.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subRole)
      this.subRole.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListRole = this.roleService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listRole = response.content;
        if (this.listRole.length === 0){
          this.notFoundMessage = "We're not found any contents";
        } else {
          this.notFoundMessage = "";
        }
        this.requestPage = response;
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
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
    this.listRole.sort(sortByProperty(property, this.sortDirection));
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
    $('#modal_add_role').appendTo("body").modal({show: true, backdrop: 'static'});
  }

  roleSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add_role').modal('toggle');
    }
  }

  roleUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update_role').modal('toggle');
    }
  }

  onDetail(role) {
    this.oldRole = role;
    this.roleService.setRole(JSON.parse(JSON.stringify(role)));
    $('#modal_update_role').appendTo("body").modal('show');  
  }

  onEnabledOrNot(id) {
    this.subRole = this.roleService.enabledOrNot({id: id})
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      },error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }
}
