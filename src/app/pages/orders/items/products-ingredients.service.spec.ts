import { TestBed } from '@angular/core/testing';

import { OrdersItemsService } from './orders-items.service';

describe('ProductsFoodInputsService', () => {
  let service: OrdersItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
