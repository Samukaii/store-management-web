import { TestBed } from '@angular/core/testing';

import { TopBarLoadingService } from './top-bar-loading.service';

describe('TopBarLoadingService', () => {
	let service: TopBarLoadingService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TopBarLoadingService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
