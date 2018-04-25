import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusCreateComponent } from './order-status-create.component';

describe('OrderStatusCreateComponent', () => {
  let component: OrderStatusCreateComponent;
  let fixture: ComponentFixture<OrderStatusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
