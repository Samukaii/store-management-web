import { TestBed } from "@angular/core/testing";
import { TopBarLoadingService } from "./top-bar-loading.service";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({})

	const service = TestBed.inject(TopBarLoadingService);

	return {service};
}

describe(TopBarLoadingService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('#setLoading', () => {
		it('must update isLoading to true when called with true', () => {
			const {service} = setup();

			service.setLoading(true);

			expect(service.isLoading()).toBe(true);
		});

		it('must update isLoading to false when called with false', () => {
			const {service} = setup();

			service.setLoading(false);

			expect(service.isLoading()).toBe(false);
		});
	});
});
