import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCategoriesListComponent } from './products-categories-list.component';

describe('FoodInputsComponent', () => {
  let component: ProductsCategoriesListComponent;
  let fixture: ComponentFixture<ProductsCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCategoriesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
