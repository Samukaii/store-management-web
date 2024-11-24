import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCategoriesFormComponent } from './products-categories-form.component';

describe('FoodInputsFormComponent', () => {
  let component: ProductsCategoriesFormComponent;
  let fixture: ComponentFixture<ProductsCategoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCategoriesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
