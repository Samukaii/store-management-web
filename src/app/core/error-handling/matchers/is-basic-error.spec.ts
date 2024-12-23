import { ApplicationErrorType } from "../enumerations/application-error-type";
import { isBasicError } from "./is-basic-error";

describe(isBasicError.name, () => {
	it('must return false if does not receives any data without type equal to ApplicationErrorType.ARGUMENT', () => {
		expect(isBasicError(undefined)).toBeFalse();
		expect(isBasicError(null)).toBeFalse();
		expect(isBasicError(23)).toBeFalse();
		expect(isBasicError(0)).toBeFalse();
		expect(isBasicError('')).toBeFalse();
		expect(isBasicError('Some value')).toBeFalse();
		expect(isBasicError(new Date())).toBeFalse();
		expect(isBasicError([])).toBeFalse();
		expect(isBasicError([123, 11])).toBeFalse();
		expect(isBasicError({})).toBeFalse();
		expect(isBasicError({type: ApplicationErrorType.ARGUMENT})).toBeFalse();
	});

	it('must return true if receives an object literal with type equal to ApplicationErrorType.ARGUMENT', () => {
		expect(isBasicError({
			type: ApplicationErrorType.BASIC
		})).toBeTrue();
	});
});
