import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPresentationComponent } from './register-presentation.component';

describe('RegisterPresentationComponent', () => {
  let component: RegisterPresentationComponent;
  let fixture: ComponentFixture<RegisterPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
