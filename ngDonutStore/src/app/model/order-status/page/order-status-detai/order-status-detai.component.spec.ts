import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusDetaiComponent } from './order-status-detai.component';

describe('OrderStatusDetaiComponent', () => {
  let component: OrderStatusDetaiComponent;
  let fixture: ComponentFixture<OrderStatusDetaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusDetaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
