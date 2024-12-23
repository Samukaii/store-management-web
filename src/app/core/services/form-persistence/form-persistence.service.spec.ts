import { TestBed } from "@angular/core/testing";
import { FormPersistenceService } from "./form-persistence.service";
import { FormBuilder } from "@angular/forms";

const setup = () => {
	TestBed.configureTestingModule({})

	const service = TestBed.inject(FormPersistenceService);

	return {service};
}

describe(FormPersistenceService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('#add', () => {
		it('must allow get value stored', () => {
			const {service} = setup();

			service.add('products', {
				name: 'Some product name',
				price: 50.00
			});

			expect(service.get('products')).toEqual({
				name: 'Some product name',
				price: 50.00
			});
		});
	});

	describe('#get', () => {
		it('must get specific form stored', () => {
			const {service} = setup();

			service.add('products', {
				name: 'Some product name',
				price: 50.00
			});

			service.add('preparations', {
				name: 'Some preparation name',
				quantity: 20
			});

			service.add('raw-materials:categories', {
				name: 'Some category name',
			});

			expect(service.get('products')).toEqual({
				name: 'Some product name',
				price: 50.00
			});

			expect(service.get('preparations')).toEqual({
				name: 'Some preparation name',
				quantity: 20
			});

			expect(service.get('raw-materials:categories')).toEqual({
				name: 'Some category name',
			});
		});
	});

	describe('#apply', () => {
		it('must patch form with stored value and then clear from storage', () => {
			const {service} = setup()

			const productForm = new FormBuilder().group({
				name: '',
				price: [0]
			});

			service.add('products', {
				name: 'Some product name',
				price: 145.45
			});

			service.apply(productForm, 'products');

			expect(productForm.getRawValue()).toEqual({
				name: 'Some product name',
				price: 145.45
			});

			expect(service.get('products')).toBeUndefined();
		});
	});
});
