import { TestBed } from '@angular/core/testing';

import { RawMaterialsCategoriesService } from './raw-materials-categories.service';

describe('FoodInputsService', () => {
  let service: RawMaterialsCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawMaterialsCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
