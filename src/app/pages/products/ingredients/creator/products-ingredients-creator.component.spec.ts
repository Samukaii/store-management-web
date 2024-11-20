import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsIngredientsCreatorComponent } from './products-ingredients-creator.component';

describe('CreatorComponent', () => {
  let component: ProductsIngredientsCreatorComponent;
  let fixture: ComponentFixture<ProductsIngredientsCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsIngredientsCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsIngredientsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
