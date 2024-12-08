import { TestBed } from '@angular/core/testing';

import { RouteConfigurationService } from './route-configuration.service';

describe('RouteConfigurationService', () => {
  let service: RouteConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
