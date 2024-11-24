import { Component, computed, input } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormControlNames } from "../../../models/form-control-names";
import { NgxCurrencyConfig, NgxCurrencyDirective } from "ngx-currency";

@Component({
    selector: 'app-form-input',
    imports: [
        MatLabel,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        NgxCurrencyDirective
    ],
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss'
})
export class FormInputComponent<Form extends FormGroup> {
	form = input.required<Form>();
	name = input.required<FormControlNames<Form>>();
	type = input<string>("text");
	inputType = input<"text" | "currency" | "decimal" | "integer">("text");
	label = input("");
	placeholder = input("");
	suffix = input("")

	currencyOptions = computed((): Partial<NgxCurrencyConfig> | undefined => {
		switch (this.inputType()) {
			case "currency":
				return {}
			case "decimal":
				return {
					prefix: "",
					precision: 3,
					suffix: this.suffix()
				}
			case "integer":
				return {
					prefix: "",
					precision: 0,
					suffix: this.suffix()
				}
			default:
				return;
		}
	})
}
