import { FormGroup, FormControl } from '@angular/forms';
import { FormHelper } from './form-helper';
import { FormModifier } from "src/app/shared/models/form-modifier";

describe('FormHelper', () => {
	describe('patchForm', () => {
		it('must patch form controls with source values', () => {
			const form = new FormGroup({
				name: new FormControl(''),
				age: new FormControl(''),
			});

			const source = { name: 'John', age: 30 };
			const modifiers: FormModifier<typeof form, typeof source>[] = [];

			FormHelper.patchForm(form, source, modifiers);

			expect(form.controls['name'].value).toBe('John');
			expect(form.controls['age'].value).toBe(30);
		});

		it('must apply modifier to form control if modifier is found', () => {
			const form = new FormGroup({
				name: new FormControl(''),
				age: new FormControl(''),
			});

			const source = { name: 'John', age: 30 };
			const modifiers: FormModifier<typeof form, typeof source>[] = [
				{
					key: 'age',
					modifier: (source: any) => source.age + 5,
				},
			];

			FormHelper.patchForm(form, source, modifiers);

			expect(form.controls['name'].value).toBe('John');
			expect(form.controls['age'].value).toBe(35);
		});

		it('must not modify form control value if no modifier is found', () => {
			const form = new FormGroup({
				name: new FormControl(''),
				age: new FormControl(''),
			});

			const source = { name: 'John', age: 30 };
			const modifiers: FormModifier<FormGroup, typeof source>[] = [
				{
					key: 'address',
					modifier: (source: any) => source.address,
				},
			];

			FormHelper.patchForm(form, source, modifiers as any);

			expect(form.controls['name'].value).toBe('John');
			expect(form.controls['age'].value).toBe(30);
		});

		it('must apply multiple modifiers correctly', () => {
			const form = new FormGroup({
				name: new FormControl(''),
				age: new FormControl(''),
			});

			const source = { name: 'John', age: 30 };
			const modifiers: FormModifier<typeof form, typeof source>[] = [
				{
					key: 'name',
					modifier: (source: any) => source.name.toUpperCase(),
				},
				{
					key: 'age',
					modifier: (source: any) => source.age + 5,
				},
			];

			FormHelper.patchForm(form, source, modifiers);

			expect(form.controls['name'].value).toBe('JOHN');
			expect(form.controls['age'].value).toBe(35);
		});
	});
});
