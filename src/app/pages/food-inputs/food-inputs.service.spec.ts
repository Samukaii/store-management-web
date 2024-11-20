import { TestBed } from '@angular/core/testing';

import { FoodInputsService } from './food-inputs.service';

describe('FoodInputsService', () => {
  let service: FoodInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
