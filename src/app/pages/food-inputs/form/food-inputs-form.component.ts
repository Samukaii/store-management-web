import { Component, computed, input, output } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { FoodInput } from "../models/food-input";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { BasicOption } from "../../../shared/models/basic-option";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { FoodInputsFormValue } from "../models/food-inputs-form-value";
import { createFoodInputsForm } from "./food-inputs-form";
import { toSignal } from "@angular/core/rxjs-interop";
import { FoodInputMeasurementUnit } from "../enums/food-input-measurement-unit";
import { FormModifier } from "../../../shared/models/form-modifier";
import { FoodInputsForm } from "../models/food-inputs-form";

@Component({
    selector: 'app-food-inputs-form',
	imports: [
		FormComponent,
		FormInputComponent,
		FormRadioComponent,
		ButtonComponent,
		FlexRowComponent
	],
    templateUrl: './food-inputs-form.component.html',
    styleUrl: './food-inputs-form.component.scss'
})
export class FoodInputsFormComponent {
	data = input<FoodInput>()
	formSubmit = output<FoodInputsFormValue>()
	form = createFoodInputsForm();

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	modifiers: FormModifier<FoodInputsForm, FoodInput>[] = [
		{
			key: "measurementUnit",
			modifier: source => source.measurementUnit.id
		}
	];

	value = computed(() => {
		const formValue = this.formValue();

		if (!formValue.measurementUnit || !formValue.cost || !formValue.quantity) return;


		switch (formValue.measurementUnit) {
			case FoodInputMeasurementUnit.GRAMS:
				return `R$ ${(formValue.cost / formValue.quantity * 1000).toFixed(2)} / Kg`;
			default:
				return `R$ ${(formValue.cost / formValue.quantity).toFixed(2)} / Unidade`;
		}
	});

	measurementUnits: BasicOption[] = [
		{
			name: "Grama",
			value: FoodInputMeasurementUnit.GRAMS
		},
		{
			name: "Unidade",
			value: FoodInputMeasurementUnit.UNIT
		},
	];

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}

	quantitySuffix = computed(() => {
		const formValue = this.formValue();

		switch (formValue.measurementUnit!) {
			case FoodInputMeasurementUnit.UNIT:
				return " unidade(s)";
			case FoodInputMeasurementUnit.GRAMS:
				return " g"
			default:
				return "";
		}
	})
}
