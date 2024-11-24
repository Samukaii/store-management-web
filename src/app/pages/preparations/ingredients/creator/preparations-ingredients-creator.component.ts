import { Component, computed, inject, input, output, signal } from '@angular/core';
import { RawMaterial } from "../../../raw-materials/models/raw-material";
import { createPreparationsIngredientsForm } from "../create-preparations-ingredients-form";
import { PreparationsIngredientsFormValue } from "../../models/preparations-ingredients-form-value";
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { AutocompleteComponent } from "../../../../shared/components/autocomplete/autocomplete.component";
import { RawMaterialsService } from "../../../raw-materials/raw-materials.service";
import { FlexRowComponent } from "../../../../shared/components/flex-row/flex-row.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormRadioComponent } from "../../../../shared/components/form/radio/form-radio.component";
import { RawMaterialsMeasurementUnit } from "../../../raw-materials/enums/raw-materials-measurement-unit";
import { toSignal } from "@angular/core/rxjs-interop";
import { AutocompleteOption } from "../../../../shared/components/autocomplete/models/autocomplete-option";

@Component({
	selector: 'app-preparations-ingredients-creator',
	imports: [
		FormInputComponent,
		FormComponent,
		AutocompleteComponent,
		FlexRowComponent,
		ButtonComponent,
		FormRadioComponent
	],
	templateUrl: './preparations-ingredients-creator.component.html',
	styleUrl: './preparations-ingredients-creator.component.scss'
})
export class PreparationsIngredientsCreatorComponent {
	data = input<RawMaterial>();
	formSubmit = output<PreparationsIngredientsFormValue>();
	form = createPreparationsIngredientsForm();

	service = inject(RawMaterialsService);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	selectedOption = signal<AutocompleteOption | null>(null);

	measurementUnitOptions = computed(() => {
		const option = this.selectedOption() as RawMaterial;

		if(!option) return [];

		if(option.measurementUnit.id === RawMaterialsMeasurementUnit.KILOGRAMS)
			return [
				{
					name: "Quilo (kg)",
					value: RawMaterialsMeasurementUnit.KILOGRAMS
				},
				{
					name: "Grama (g)",
					value: RawMaterialsMeasurementUnit.GRAMS
				},
			];


		return [
			{
				name: "Litro (L)",
				value: RawMaterialsMeasurementUnit.LITER
			},
			{
				name: "Mililitro (ml)",
				value: RawMaterialsMeasurementUnit.MILLILITER
			},
		]
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
				return " g"
			default:
				return "";
		}
	})

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
