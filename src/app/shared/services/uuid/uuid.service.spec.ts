import { TestBed } from "@angular/core/testing";
import { UuidService } from "./uuid.service";

const setup = () => {
	TestBed.configureTestingModule({})

	const service = TestBed.inject(UuidService);

	return {service};
}

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe(UuidService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('#generate', () => {
		it('must generate a new string in uuid pattern on each call', () => {
			const {service} = setup();

			const first = service.generate();
			const second = service.generate();
			const third = service.generate();

			expect(first).toMatch(uuidRegex);
			expect(second).toMatch(uuidRegex);
			expect(third).toMatch(uuidRegex);

			const allResultsAreDifferent = first !== second && second !== third && third !== first;

			expect(allResultsAreDifferent).toBe(true);
		});
	});
});
