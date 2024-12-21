import { AutocompleteMethod } from "../../autocomplete/models/autocomplete-method";
import { of } from "rxjs";
import { ValidatorFn } from "@angular/forms";
import { UndefinedToOptional } from "../../../models/component-inputs";

const dynamicFormControlOptions = {
	input: {
		type: "input",
		key: "" as string,
		valueType: "" as string,
		validators: [] as ValidatorFn | ValidatorFn[] | undefined,
		defaultValue: "" as string | undefined,
		options: {
			label: "" as string,
			placeholder: "" as string,
		}
	},
	autocomplete: {
		type: "autocomplete",
		key: "" as string,
		valueType: "" as string | number,
		validators: [] as ValidatorFn | ValidatorFn[] | undefined,
		defaultValue: "" as number | string | undefined,
		options: {
			method: ((_) => of({})) as AutocompleteMethod,
			label: "" as string,
			placeholder: "" as string,
		}
	}
} as const;

type DynamicFormControlOptions = typeof dynamicFormControlOptions;

export type DynamicFormControlType = keyof DynamicFormControlOptions;
export type DynamicFormControl = UndefinedToOptional<DynamicFormControlOptions[DynamicFormControlType]>;

export type DynamicForm = {
	[key: string]: Omit<DynamicFormControl, "key">;
};

export type DynamicFormValue<Form> = {
	[key in keyof Form]: Form[key] extends {valueType: any} ? Form[key]['valueType']: never;
}
