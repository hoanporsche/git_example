import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusDetailComponent } from './order-status-detail.component';

describe('OrderStatusDetailComponent', () => {
  let component: OrderStatusDetailComponent;
  let fixture: ComponentFixture<OrderStatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
