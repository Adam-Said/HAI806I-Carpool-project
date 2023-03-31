import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripModalComponent } from './trip-modal.component';

describe('TripModalComponent', () => {
  let component: TripModalComponent;
  let fixture: ComponentFixture<TripModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
