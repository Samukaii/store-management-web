import { Component, computed, input, output } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { Preparation } from "../models/preparation";
import {
	createPreparationsDefineQuantityForm,
	PreparationsDefineQuantityPayload
} from "./create-preparations-define-quantity.form";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { BasicOption } from "../../../shared/models/basic-option";
import { RawMaterialsMeasurementUnit } from "../../raw-materials/enums/raw-materials-measurement-unit";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-preparations-define-quantity',
	imports: [
		FormComponent,
		FormInputComponent,
		FormRadioComponent,
		ReactiveFormsModule
	],
    templateUrl: './preparations-define-quantity.component.html',
    styleUrl: './preparations-define-quantity.component.scss'
})
export class PreparationsDefineQuantityComponent {
	preparation = input<Preparation>();
	formSubmit = output<PreparationsDefineQuantityPayload>();

	form = createPreparationsDefineQuantityForm(this.preparation()!);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	measurementUnits: BasicOption[] = [
		{
			name: "Quilo (kg)",
			value: RawMaterialsMeasurementUnit.KILOGRAMS
		},
		{
			name: "Grama (g)",
			value: RawMaterialsMeasurementUnit.GRAMS
		},
		{
			name: "Litro (L)",
			value: RawMaterialsMeasurementUnit.LITER
		},
		{
			name: "Mililitro (ml)",
			value: RawMaterialsMeasurementUnit.MILLILITER
		},
		{
			name: "Unidade",
			value: RawMaterialsMeasurementUnit.UNIT
		},
	];

	inputType = computed(() => {
		const formValue = this.formValue();

		switch (formValue.measurementUnit) {
			case RawMaterialsMeasurementUnit.KILOGRAMS:
				return "decimal";
			case RawMaterialsMeasurementUnit.GRAMS:
				return "integer";
			case RawMaterialsMeasurementUnit.LITER:
				return "decimal";
			case RawMaterialsMeasurementUnit.MILLILITER:
				return "integer";
			case RawMaterialsMeasurementUnit.UNIT:
				return "integer";
			default:
				return "decimal"
		}
	});

	quantitySuffix = computed(() => {
		const formValue = this.formValue();

		switch (formValue.measurementUnit!) {
			case RawMaterialsMeasurementUnit.KILOGRAMS:
				return " kg";
			case RawMaterialsMeasurementUnit.GRAMS:
				return " g";
			case RawMaterialsMeasurementUnit.LITER:
				return " L";
			case RawMaterialsMeasurementUnit.MILLILITER:
				return " ml";
			case RawMaterialsMeasurementUnit.UNIT:
				return " unidade(s)";
			default:
				return "";
		}
	});

	onSubmit() {
		const value = this.form.getRawValue();

		if(value.measurementUnit === RawMaterialsMeasurementUnit.GRAMS) {
			value.measurementUnit = RawMaterialsMeasurementUnit.KILOGRAMS;
			value.quantity = (value.quantity ?? 0) / 1000;
		}
		if(value.measurementUnit === RawMaterialsMeasurementUnit.MILLILITER) {
			value.measurementUnit = RawMaterialsMeasurementUnit.LITER;
			value.quantity = (value.quantity ?? 0) / 1000;
		}

		this.formSubmit.emit(value);
	}
}
