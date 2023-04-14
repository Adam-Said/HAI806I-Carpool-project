import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPicComponent } from './edit-pic.component';

describe('EditPicComponent', () => {
  let component: EditPicComponent;
  let fixture: ComponentFixture<EditPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
