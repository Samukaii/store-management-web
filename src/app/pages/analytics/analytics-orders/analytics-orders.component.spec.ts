import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsOrdersComponent } from './analytics-orders.component';

describe('AnalyticsOrdersComponent', () => {
  let component: AnalyticsOrdersComponent;
  let fixture: ComponentFixture<AnalyticsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
