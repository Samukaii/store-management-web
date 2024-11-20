import { TestBed } from '@angular/core/testing';

import { LocalActionsService } from './local-actions.service';

describe('LocalActionsService', () => {
  let service: LocalActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
