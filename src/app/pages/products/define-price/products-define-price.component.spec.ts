import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDefinePriceComponent } from './products-define-price.component';

describe('ProductsFoodInputsDefinePriceComponent', () => {
  let component: ProductsDefinePriceComponent;
  let fixture: ComponentFixture<ProductsDefinePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDefinePriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDefinePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
