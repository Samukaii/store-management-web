import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsBestSellingComponent } from './analytics-best-selling.component';

describe('BestSellingComponent', () => {
  let component: AnalyticsBestSellingComponent;
  let fixture: ComponentFixture<AnalyticsBestSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsBestSellingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsBestSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
