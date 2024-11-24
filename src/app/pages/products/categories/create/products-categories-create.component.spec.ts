import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCategoriesCreateComponent } from './products-categories-create.component';

describe('FoodInputsCreateComponent', () => {
  let component: ProductsCategoriesCreateComponent;
  let fixture: ComponentFixture<ProductsCategoriesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCategoriesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
