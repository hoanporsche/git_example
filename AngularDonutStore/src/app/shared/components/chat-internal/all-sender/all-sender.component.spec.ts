import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSenderComponent } from './all-sender.component';

describe('AllSenderComponent', () => {
  let component: AllSenderComponent;
  let fixture: ComponentFixture<AllSenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
