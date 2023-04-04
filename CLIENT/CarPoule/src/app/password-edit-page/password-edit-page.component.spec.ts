import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEditPageComponent } from './password-edit-page.component';

describe('PasswordEditPageComponent', () => {
  let component: PasswordEditPageComponent;
  let fixture: ComponentFixture<PasswordEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
