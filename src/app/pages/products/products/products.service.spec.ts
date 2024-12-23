import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [
			provideHttpClient(),
			provideHttpClientTesting()
		]
	})

	const service = TestBed.inject(ProductsService);

	return {service};
}

describe(ProductsService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});
});
