import { ApplicationErrorType } from "../enumerations/application-error-type";
import { isObjectLiteral } from "../../../shared/helpers/is-object-literal";
import { ApplicationArgumentError } from "../models/application-argument-error";

export const isArgumentError = (error: unknown): error is ApplicationArgumentError => {
	if(!isObjectLiteral(error)) return false;

	return error['type'] === ApplicationErrorType.ARGUMENT;
};
