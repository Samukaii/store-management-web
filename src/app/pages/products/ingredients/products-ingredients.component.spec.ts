import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsIngredientsComponent } from './products-ingredients.component';

describe('ProductsFoodInputsComponent', () => {
  let component: ProductsIngredientsComponent;
  let fixture: ComponentFixture<ProductsIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
