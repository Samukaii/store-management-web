import { Component, computed, inject, input, output } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { RawMaterial } from "../models/raw-material";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { BasicOption } from "../../../shared/models/basic-option";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { RawMaterialsFormValue } from "../models/raw-materials-form-value";
import { toSignal } from "@angular/core/rxjs-interop";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";
import { FormModifier } from "../../../shared/models/form-modifier";
import { RawMaterialsForm } from "../models/raw-materials-form";
import { createRawMaterialsForm } from "./create-raw-materials-form";
import { AutocompleteComponent } from "../../../shared/components/autocomplete/autocomplete.component";
import { RawMaterialsCategoriesService } from "../categories/raw-materials-categories.service";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-raw-materials-form',
	imports: [
		FormComponent,
		FormInputComponent,
		FormRadioComponent,
		FlexRowComponent,
		AutocompleteComponent,
		ReactiveFormsModule
	],
    templateUrl: './raw-materials-form.component.html',
    styleUrl: './raw-materials-form.component.scss'
})
export class RawMaterialsFormComponent {
	data = input<RawMaterial>();
	formSubmit = output<RawMaterialsFormValue>()
	form = createRawMaterialsForm();

	categoriesService = inject(RawMaterialsCategoriesService);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	modifiers: FormModifier<RawMaterialsForm, RawMaterial>[] = [
		{
			key: "measurementUnit",
			modifier: source => source.measurementUnit.id
		},
	];

	value = computed(() => {
		const formValue = this.formValue();

		if (!formValue.measurementUnit || !formValue.cost || !formValue.quantity) return;


		switch (formValue.measurementUnit) {
			case RawMaterialsMeasurementUnit.GRAMS:
				return `R$ ${(formValue.cost / formValue.quantity * 1000).toFixed(2)} / kg`;
			case RawMaterialsMeasurementUnit.KILOGRAMS:
				return `R$ ${(formValue.cost / formValue.quantity).toFixed(2)} / kg`;
			case RawMaterialsMeasurementUnit.LITER:
				return `R$ ${(formValue.cost / formValue.quantity).toFixed(2)} / L`;
			case RawMaterialsMeasurementUnit.MILLILITER:
				return `R$ ${(formValue.cost / formValue.quantity * 1000).toFixed(2)} / L`;
			default:
				return `R$ ${(formValue.cost / formValue.quantity).toFixed(2)} / Unidade`;
		}
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

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}

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
}
