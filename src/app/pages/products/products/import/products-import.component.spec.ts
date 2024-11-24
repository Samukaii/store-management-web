import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImportComponent } from './products-import.component';

describe('ProductsFoodInputsDefinePriceComponent', () => {
  let component: ProductsImportComponent;
  let fixture: ComponentFixture<ProductsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
