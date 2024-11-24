import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCategoriesUpdateComponent } from './products-categories-update.component';

describe('FoodInputsUpdateComponent', () => {
  let component: ProductsCategoriesUpdateComponent;
  let fixture: ComponentFixture<ProductsCategoriesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCategoriesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCategoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
