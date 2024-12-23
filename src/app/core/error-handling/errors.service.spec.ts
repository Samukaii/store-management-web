import { TestBed } from "@angular/core/testing";
import { ErrorsService } from "./errors.service";
import { take } from "rxjs";

const setup = () => {
	TestBed.configureTestingModule({})

	const service = TestBed.inject(ErrorsService);

	return {service};
}

describe(ErrorsService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('#setErrors', () => {
		it('must allow watch field with exact name passed', () => {
			const {service} = setup();

			service.setErrors({
				name: "Name is required",
				cpf: "CPF does not match",
			});

			const messages: string[] = [];

			service.watchFieldError('name').pipe(take(1)).subscribe(error => messages.push(error));
			service.watchFieldError('cpf').pipe(take(1)).subscribe(error => messages.push(error));

			expect(messages).toEqual([
				"Name is required",
				"CPF does not match"
			]);
		});
	});

	describe('#watchFieldError', () => {
		it('must watch any time setErrors change message for specific field', () => {
			const {service} = setup();

			const messages: (null | string)[] = [];

			service.watchFieldError('cpf').pipe(take(3)).subscribe(value => messages.push(value));

			service.setErrors({
				cpf: 'CPF is required',
			});

			service.setErrors({
				cpf: 'CPF does not match',
			});

			expect(messages).toEqual([
				null,
				"CPF is required",
				"CPF does not match",
			]);
		});
	});

	describe('#clearErrors', () => {
		it('must clear specific field that is being watched', () => {
			const {service} = setup();

			const nameMessages: (null | string)[] = [];
			const cpfMessages: (null | string)[] = [];

			service.watchFieldError('name').pipe(take(4)).subscribe(value => nameMessages.push(value));
			service.watchFieldError('cpf').pipe(take(4)).subscribe(value => cpfMessages.push(value));

			service.setErrors({
				name: "Name is required",
				cpf: 'CPF is required',
			});

			service.setErrors({
				name: "Name is too short",
				cpf: 'CPF does not match',
			});

			service.clearFieldError('name');

			expect(nameMessages).toEqual([
				null,
				"Name is required",
				"Name is too short",
				null,
			]);

			expect(cpfMessages).toEqual([
				null,
				"CPF is required",
				"CPF does not match",
				"CPF does not match",
			]);
		});
	});

	describe('#clearErrors', () => {
		it('must clear any field that is being watched', () => {
			const {service} = setup();

			const nameMessages: (null | string)[] = [];
			const cpfMessages: (null | string)[] = [];

			service.watchFieldError('name').pipe(take(4)).subscribe(value => nameMessages.push(value));
			service.watchFieldError('cpf').pipe(take(4)).subscribe(value => cpfMessages.push(value));

			service.setErrors({
				name: "Name is required",
				cpf: 'CPF is required',
			});

			service.setErrors({
				name: "Name is too short",
				cpf: 'CPF does not match',
			});

			service.clearErrors();

			expect(nameMessages).toEqual([
				null,
				"Name is required",
				"Name is too short",
				null,
			]);

			expect(cpfMessages).toEqual([
				null,
				"CPF is required",
				"CPF does not match",
				null,
			]);
		});
	});
});
