import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUpdateComponent } from './orders-update.component';

describe('FoodInputsUpdateComponent', () => {
  let component: OrdersUpdateComponent;
  let fixture: ComponentFixture<OrdersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
