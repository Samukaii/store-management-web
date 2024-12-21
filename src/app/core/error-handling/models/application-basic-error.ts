import { ApplicationErrorType } from "../enumerations/application-error-type";
import { ApplicationError } from "./application-error";

export interface ApplicationBasicError extends ApplicationError{
	type: ApplicationErrorType.BASIC,
	message: string;
}
