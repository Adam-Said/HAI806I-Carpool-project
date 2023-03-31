import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripsComponent } from './my-trips.component';

describe('MyTripsComponent', () => {
  let component: MyTripsComponent;
  let fixture: ComponentFixture<MyTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
