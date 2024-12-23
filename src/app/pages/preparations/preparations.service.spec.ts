import { TestBed } from "@angular/core/testing";
import { PreparationsService } from "./preparations.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { Preparation } from "./models/preparation";
import { environment } from "../../environments/environment";
import { Generic } from "../../shared/models/generic";
import { PreparationsFormValue } from "./models/preparations-form-value";
import { validateRequest } from "../../testing/utils/validate-request";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [
			provideHttpClient(),
			provideHttpClientTesting()
		]
	})

	const service = TestBed.inject(PreparationsService);

	return {service};
}

describe(PreparationsService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('#getAll', () => {
		it('must call correct url and return data from http call', () => {
			const {service} = setup();

			let result: Preparation[] = [];

			service.getAll().subscribe((data) => {
				result = data;
			});

			const expectedResult = [
				{id: 1, name: 'Croquette Dough'},
				{id: 2, name: 'Cake Batter'},
				{id: 3, name: 'Mousse Base'},
				{id: 4, name: 'Pie Crust'},
			] as Preparation[];

			validateRequest({
				url: `${environment.api}/preparations`,
				method: 'GET',
				responseType: 'success',
				response: expectedResult,
			});

			expect(result).toEqual(expectedResult);
		});
	});

	describe('#single', () => {
		it('must call correct url and return data from http call', () => {
			const {service} = setup();

			let result!: Preparation;

			service.single(55).subscribe((data) => {
				result = data;
			});

			const expectedResult = {id: 1, name: 'Croquette Dough'} as Preparation;

			validateRequest({
				url: `${environment.api}/preparations/55`,
				method: 'GET',
				responseType: 'success',
				response: expectedResult,
			});

			expect(result).toEqual(expectedResult);
		});
	});

	describe('#delete', () => {
		it('must call correct url and return data from http call', () => {
			const {service} = setup();

			let result!: Generic;

			service.delete(55).subscribe((data) => {
				result = data;
			});

			const expectedResult = {} as Preparation;

			validateRequest({
				url: `${environment.api}/preparations/55`,
				method: 'DELETE',
				responseType: 'success',
				response: expectedResult,
			});

			expect(result).toEqual(expectedResult);
		});
	});

	describe('#create', () => {
		it('must call correct url, pass given payload and return data from http call', () => {
			const {service} = setup();

			let result!: Generic;

			const payload = {
				name: "Croquette Dough",
				quantity: 12
			} as PreparationsFormValue;

			service.create(payload).subscribe((data) => {
				result = data;
			});

			const expectedResult = {} as Preparation;

			validateRequest({
				url: `${environment.api}/preparations`,
				method: 'POST',
				body: payload,
				responseType: 'success',
				response: expectedResult,
			});

			expect(result).toEqual(expectedResult);
		});
	});

	describe('#autocomplete', () => {
		it('must call correct url and return data from http call', () => {
			const {service} = setup();

			let result: Preparation[] = [];

			const params = {
				'name:equal': "Croquette Dough"
			};

			service.autocomplete(params).subscribe((data) => {
				result = data;
			});

			const expectedResult = [
				{id: 1, name: 'Croquette Dough'},
				{id: 2, name: 'Cake Batter'},
				{id: 3, name: 'Mousse Base'},
				{id: 4, name: 'Pie Crust'},
			] as Preparation[];

			validateRequest({
				url: `${environment.api}/preparations/autocomplete`,
				method: 'GET',
				queryParams: params,
				responseType: 'success',
				response: expectedResult,
			});

			expect(result).toEqual(expectedResult);
		});
	});

	describe('#update', () => {
		it('must call correct url and return data from http call', () => {
			const {service} = setup();

			let result!: Preparation;

			const payload: Partial<PreparationsFormValue> = {
				name: "Cake Batter",
			};

			service.update(23, payload).subscribe((data) => {
				result = data;
			});

			const expectedResult = {id: 2, name: 'Cake Batter'} as Preparation;

			validateRequest({
				url: `${environment.api}/preparations/23`,
				method: 'PUT',
				body: payload,
				responseType: 'success',
				response: expectedResult,
			});

			expect(result).toEqual(expectedResult);
		});
	});
});
