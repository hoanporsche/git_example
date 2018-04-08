import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDetailComponent } from './supply-detail.component';

describe('SupplyDetailComponent', () => {
  let component: SupplyDetailComponent;
  let fixture: ComponentFixture<SupplyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
