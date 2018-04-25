import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyCreateComponent } from './supply-create.component';

describe('SupplyCreateComponent', () => {
  let component: SupplyCreateComponent;
  let fixture: ComponentFixture<SupplyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
