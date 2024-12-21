import { DialogOptions } from "../../../services/models/dialog-options";
import { DynamicForm, DynamicFormValue } from "../../dynamic-form/models/dynamic-form-control";
import { Button } from "../../button/models/button";

export interface ConfirmActionOptions<Form extends DynamicForm> {
	title: string;
	description?: string;
	form?: Form;
	actions?: {
		primary?: Partial<Button<[DynamicFormValue<Form>]>>;
		secondary?: Partial<Button<[DynamicFormValue<Form>]>>;
	}
	config?: DialogOptions<any, any>["config"];
}
