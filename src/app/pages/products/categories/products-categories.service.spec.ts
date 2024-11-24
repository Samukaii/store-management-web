import { TestBed } from '@angular/core/testing';

import { ProductsCategoriesService } from './products-categories.service';

describe('FoodInputsService', () => {
  let service: ProductsCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
