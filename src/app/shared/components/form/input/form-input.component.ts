import { Component, computed, Input, input } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormControlNames } from "../../../models/form-control-names";
import { NgxCurrencyConfig, NgxCurrencyDirective, NgxCurrencyInputMode } from "ngx-currency";

@Component({
  selector: 'app-form-input',
  standalone: true,
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
	suffix = input<string>()

	currencyOptions = computed((): Partial<NgxCurrencyConfig> | undefined => {
		switch (this.inputType()) {
			case "currency":
				return {}
			case "decimal":
				return {
					prefix: "",
					precision: 1,
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
