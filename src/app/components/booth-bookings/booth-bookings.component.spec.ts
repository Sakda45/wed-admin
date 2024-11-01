import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothBookingsComponent } from './booth-bookings.component';

describe('BoothBookingsComponent', () => {
  let component: BoothBookingsComponent;
  let fixture: ComponentFixture<BoothBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoothBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoothBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
