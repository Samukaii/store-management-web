import { TestBed } from '@angular/core/testing';

import { ProductsIngredientsService } from './preparations-ingredients.service';

describe('ProductsFoodInputsService', () => {
  let service: ProductsIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
