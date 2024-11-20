import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersImportComponent } from './orders-import.component';

describe('ProductsFoodInputsDefinePriceComponent', () => {
  let component: OrdersImportComponent;
  let fixture: ComponentFixture<OrdersImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
