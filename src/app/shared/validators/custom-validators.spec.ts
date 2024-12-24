import { CustomValidators } from "src/app/shared/validators/custom-validators";
import { FormControl } from "@angular/forms";


fdescribe('CustomValidators', () => {
	describe('#greaterThanZero', () => {
		it('must return non-number error if the control value is not a number', () => {
			const control = new FormControl();

			control.setValue('')
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});

			control.setValue('non-empty string')
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});

			control.setValue(true)
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});

			control.setValue(false)
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});

			control.setValue([])
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});

			control.setValue(["non-empty array"])
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});

			control.setValue(new Date())
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Não é um número"
			});
		});

		it('must return less than zero error when control value is negative', () => {
			const control = new FormControl();

			control.setValue(-123)
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Deve ser maior que zero"
			});

			control.setValue(-1)
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Deve ser maior que zero"
			});
		});

		it('must return greater than zero error when control value is zero', () => {
			const control = new FormControl();

			control.setValue(0)
			expect(CustomValidators.greaterThanZero(control)).toEqual({
				customError: "Deve ser maior que zero"
			});
		});

		it('must return null when control value is positive', () => {
			const control = new FormControl();

			control.setValue(1)
			expect(CustomValidators.greaterThanZero(control)).toBe(null);

			control.setValue(231)
			expect(CustomValidators.greaterThanZero(control)).toBe(null);
		});
	});
});
