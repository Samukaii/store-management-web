import { ApplicationErrorType } from "../enumerations/application-error-type";
import { isObjectLiteral } from "src/app/shared/helpers/is-object-literal/is-object-literal";
import { ApplicationBasicError } from "../models/application-basic-error";

export const isBasicError = (error: unknown): error is ApplicationBasicError => {
	if(!isObjectLiteral(error)) return false;

	return error['type'] === ApplicationErrorType.BASIC;
};
