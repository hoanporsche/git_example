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
  storeName = '';
  error = {
    isError: false,
    message: ''
  }

  private subListStore: Subscription;
  private subListMaterial: Subscription;
  private subListMaterialDailyReport: Subscription;
  private subOnSubmit: Subscription;

  formReports: FormGroup;
  reportsFormArray: FormArray;

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
        this.error.isError = false;
        this.listStore = response;
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      });
    this.subListMaterial = this.materialService.findAll()
      .subscribe(response => {
        this.error.isError = false;
        this.listMaterial = response;
        if (this.listMaterial && this.listMaterial.length > 0) {
          this.createFormReports(this.listMaterial);
          // if (!this.isAdmin) {
          //   this.findDailyReport();
          // }
        }
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      });

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
    this.subListMaterialDailyReport = this.materialDailyReportService.findDailyReport({ storeId: this.storeName })
      .subscribe(response => {
        this.error.isError = false;
        this.listMaterialDailyReport = response;
        if (this.listMaterialDailyReport && this.listMaterialDailyReport.length > 0) {
          //set initial value for formArray
          this.reportsFormArray = this.formReports.get('reports') as FormArray;
          for (let i = 0; i < this.reportsFormArray.length; i++) {
            this.reportsFormArray[i].get('materialId').setValue()
          }
        }
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      });
  }

  adminFindDailyReport() {
    this.formReports.reset();
    this.storeId.setValue(this.storeName);
    this.findDailyReport();
  }

  addSingleRowReport(material: Material) {
    return this.fb.group({
      materialId: [material],
      materialRemain: ['', [Validators.required, CommonValidator.notEmpty]],
      materialImport: ['', [Validators.required, CommonValidator.notEmpty]],
      description: ['']
    });
  }

  addRowToForm(material: Material) {
    this.reportsFormArray = this.formReports.get('reports') as FormArray;
    this.reportsFormArray.push(this.addSingleRowReport(material));
  }

  createFormReports(material: Material[]) {
    for (let i = 0; i < material.length; i++) {
      this.addRowToForm(material[i]);
    }
  }

  onSubmit() {
    console.log("form", this.formReports.value);
    if (this.formReports.valid) {
      const listReport = this.formReports.get('reports').value;
      console.log("list report", listReport);
      this.subOnSubmit = this.materialDailyReportService.save(listReport, this.storeName)
        .subscribe(response => {
          this.error.isError = false;

        }, error => {
          this.error.isError = true;
          this.error.message = error.error;
          console.log(error.error)
        });
    }
  }

  get storeId() {
    return this.formReports.get('storeId');
  }

  get reports() {
    return this.formReports.get('reports');
  }
}
