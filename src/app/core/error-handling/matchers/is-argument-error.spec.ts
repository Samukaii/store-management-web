import { isArgumentError } from "./is-argument-error";
import { ApplicationErrorType } from "../enumerations/application-error-type";

describe(isArgumentError.name, () => {
	it('must return false if does not receives any data without type equal to ApplicationErrorType.ARGUMENT', () => {
		expect(isArgumentError(undefined)).toBeFalse();
		expect(isArgumentError(null)).toBeFalse();
		expect(isArgumentError(23)).toBeFalse();
		expect(isArgumentError(0)).toBeFalse();
		expect(isArgumentError('')).toBeFalse();
		expect(isArgumentError('Some value')).toBeFalse();
		expect(isArgumentError(new Date())).toBeFalse();
		expect(isArgumentError([])).toBeFalse();
		expect(isArgumentError([123, 11])).toBeFalse();
		expect(isArgumentError({})).toBeFalse();
		expect(isArgumentError({type: ApplicationErrorType.BASIC})).toBeFalse();
	});

	it('must return true if receives an object literal with type equal to ApplicationErrorType.ARGUMENT', () => {
		expect(isArgumentError({
			type: ApplicationErrorType.ARGUMENT
		})).toBeTrue();
	});
});
