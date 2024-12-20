import { booleanAttribute, Component, computed, input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgxCurrencyConfig, NgxCurrencyDirective } from "ngx-currency";
import { FieldErrorComponent } from "../../field-error/field-error.component";
import { GlobalErrorDirective } from "../../../directives/global-error/global-error.directive";

@Component({
    selector: 'app-form-input',
	imports: [
		MatLabel,
		MatFormField,
		ReactiveFormsModule,
		MatInput,
		NgxCurrencyDirective,
		MatError,
		FieldErrorComponent,
	],
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss',
	hostDirectives: [{
		directive: GlobalErrorDirective,
		inputs: ["control"]
	}]
})
export class FormInputComponent {
	control = input.required<FormControl>();
	type = input<string>("text");
	inputType = input<"text" | "currency" | "decimal" | "integer">("text");
	label = input("");
	placeholder = input("");
	suffix = input("");
	noSpellcheck = input(false, {transform: booleanAttribute});

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
