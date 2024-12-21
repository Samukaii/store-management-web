import { ApplicationErrorType } from "../enumerations/application-error-type";
import { ApplicationError } from "./application-error";

export interface ApplicationArgumentError extends ApplicationError{
	type: ApplicationErrorType.ARGUMENT,
	messages: Record<string, string>;
}
