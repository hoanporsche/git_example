import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChatInternalComponent } from './form-chat-internal.component';

describe('FormChatInternalComponent', () => {
  let component: FormChatInternalComponent;
  let fixture: ComponentFixture<FormChatInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChatInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChatInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
