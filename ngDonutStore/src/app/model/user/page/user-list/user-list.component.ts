import { RoleService } from './../../../role/service/role.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../user';
import { Store } from '../../../store/store';
import { UserService } from '../../service/user.service';
import { StoreService } from '../../../store/service/store.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';
import { Role } from '../../../role/role';

declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  listUser: User[];
  listStore: Store[];
  listRole: Role[];
  oldUser: User;

  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };
  success = {
    isSuccess: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  private params = {
    storeId: '',
    roleId: '',
    dateStart: '',
    dateEnd: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  private subListUser: Subscription;
  private subSortService: Subscription;
  private subListStore: Subscription;
  private subListRole: Subscription;
  private subUser: Subscription;

  constructor(private userService: UserService,
    private storeService: StoreService,
    private roleService: RoleService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      });
    this.subListRole = this.roleService.findAll()
      .subscribe(response => {
        this.listRole = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subListUser)
      this.subListUser.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListRole)
      this.subListRole.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListUser = this.userService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listUser = response.content;
        if (this.listUser.length === 0) {
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
    this.listUser.sort(sortByProperty(property, this.sortDirection));
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
    $('#modal_add_user').appendTo("body").modal({ show: true, backdrop: 'static' });
  }

  userSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add_user').modal('toggle');
    }
  }

  userUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update_user').modal('toggle');
    }
  }

  onDetail(user) {
    this.oldUser = user;
    this.userService.setUser(JSON.parse(JSON.stringify(user)));
    $('#modal_update_user').appendTo("body").modal('show');
  }

  onResetPassword(email) {
    this.userService.resetPassword(email)
      .subscribe(response => {
        this.findList();
        this.error.isError = false;
        this.success.isSuccess = true;
        this.success.message = "Password has been reseted successful";
      }, error => {
        this.success.isSuccess = false;
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

  onEnabledOrNot(id) {
    this.subUser = this.userService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }
}
