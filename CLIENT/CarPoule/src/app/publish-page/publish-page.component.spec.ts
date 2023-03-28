import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPageComponent } from './publish-page.component';

describe('PublishPageComponent', () => {
  let component: PublishPageComponent;
  let fixture: ComponentFixture<PublishPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
