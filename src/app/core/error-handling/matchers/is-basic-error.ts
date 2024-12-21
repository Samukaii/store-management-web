import { ApplicationErrorType } from "../enumerations/application-error-type";
import { isObjectLiteral } from "../../../shared/helpers/is-object-literal";
import { ApplicationBasicError } from "../models/application-basic-error";

export const isBasicError = (error: unknown): error is ApplicationBasicError => {
	if(!isObjectLiteral(error)) return false;

	return error['type'] === ApplicationErrorType.BASIC;
};
