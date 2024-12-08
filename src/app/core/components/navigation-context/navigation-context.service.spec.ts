import { TestBed } from '@angular/core/testing';

import { NavigationContextService } from './navigation-context.service';

describe('NavigationContextService', () => {
  let service: NavigationContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
