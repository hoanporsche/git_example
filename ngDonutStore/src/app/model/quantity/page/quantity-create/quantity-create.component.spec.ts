import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityCreateComponent } from './quantity-create.component';

describe('QuantityCreateComponent', () => {
  let component: QuantityCreateComponent;
  let fixture: ComponentFixture<QuantityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
