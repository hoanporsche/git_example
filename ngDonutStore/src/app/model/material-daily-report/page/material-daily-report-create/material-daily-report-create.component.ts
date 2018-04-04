import { CommonValidator } from './../../../../shared/custom-validator/common.validator';
import { MaterialDailyReport } from './../../material-daily-report';
import { MaterialService } from './../../../material/service/material.service';
import { NavigationService } from './../../../../core/services/navigation.service';
import { StoreService } from './../../../store/service/store.service';
import { MaterialDailyReportService } from './../../service/material-daily-report.service';
import { Store } from './../../../store/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IdentityService } from '../../../../core/services/identity.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Material } from '../../../material/material';

@Component({
  selector: 'app-material-daily-report-create',
  templateUrl: './material-daily-report-create.component.html',
  styleUrls: ['./material-daily-report-create.component.css']
})
export class MaterialDailyReportCreateComponent implements OnInit, OnDestroy {


  listStore: Store[];
  listMaterial: Material[];
  listMaterialDailyReport: MaterialDailyReport[];
  isAdmin = false;
  today = new Date();
  storeId = '';

  private subListStore: Subscription;
  private subListMaterial: Subscription;
  private subListMaterialDailyReport: Subscription;

  formReports: FormGroup;

  constructor(private materialDailyReportService: MaterialDailyReportService,
    private storeService: StoreService,
    private identityService: IdentityService,
    private navigationService: NavigationService,
    private materialService: MaterialService,
    private fb: FormBuilder) {
    this.isAdmin = this.identityService.isAdmin();
      this.formReports = this.fb.group({
        reports: this.fb.array([]),
      });
  }

  ngOnInit() {
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      });
    this.subListMaterial = this.materialService.findAll()
      .subscribe(response => {
        this.listMaterial = response;
      });
    if (!this.isAdmin) {
      this.findDailyReport();
    }
      
  }

  ngOnDestroy(): void {
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListMaterial)
      this.subListMaterial.unsubscribe();
    if (this.subListMaterialDailyReport) 
      this.subListMaterialDailyReport.unsubscribe();
  }

  findDailyReport() {
    console.log(this.storeId)
    this.subListMaterialDailyReport = this.materialDailyReportService.findDailyReport({ storeId: this.storeId})
      .subscribe((response: Response) => {
        console.log("=========", this.listMaterialDailyReport)
        if (this.listMaterialDailyReport && this.listMaterialDailyReport.length > 0) {
          //set initial value for formArray
        }
      }, error => {
        console.log(error.error)
      }); 
  }

  addSingleRowReport() {
    return this.fb.group({
      materialId: [''],
      materialRemain: ['', [Validators.required, CommonValidator.notEmpty]],
      materialImport: ['', [Validators.required, CommonValidator.notEmpty]],
      description: ['']
    });
  } 

  addRowToForm() {
    this.formReports;
  }
}
