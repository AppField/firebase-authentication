import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPresentationComponent } from './login-presentation.component';

describe('LoginPresentationComponent', () => {
  let component: LoginPresentationComponent;
  let fixture: ComponentFixture<LoginPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});