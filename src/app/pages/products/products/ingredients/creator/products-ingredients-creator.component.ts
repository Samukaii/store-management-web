import { Component, computed, inject, input, output, signal } from '@angular/core';
import { createProductsIngredientsForm } from "../create-products-ingredients-form";
import { ProductsIngredientsFormValue } from "../../models/products-ingredients-form-value";
import { FormInputComponent } from "../../../../../shared/components/form/input/form-input.component";
import { FormComponent } from "../../../../../shared/components/form/form/form.component";
import { AutocompleteComponent } from "../../../../../shared/components/autocomplete/autocomplete.component";
import { FlexRowComponent } from "../../../../../shared/components/flex-row/flex-row.component";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { FormRadioComponent } from "../../../../../shared/components/form/radio/form-radio.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { AutocompleteOption } from "../../../../../shared/components/autocomplete/models/autocomplete-option";
import { BasicOption } from "../../../../../shared/models/basic-option";
import { RawMaterialsService } from "../../../../raw-materials/raw-materials.service";
import { PreparationsService } from "../../../../preparations/preparations.service";
import { RawMaterial } from "../../../../raw-materials/models/raw-material";
import { RawMaterialsMeasurementUnit } from "../../../../raw-materials/enums/raw-materials-measurement-unit";

@Component({
	selector: 'app-products-ingredients-creator',
	imports: [
		FormInputComponent,
		FormComponent,
		AutocompleteComponent,
		FlexRowComponent,
		ButtonComponent,
		FormRadioComponent
	],
	templateUrl: './products-ingredients-creator.component.html',
	styleUrl: './products-ingredients-creator.component.scss'
})
export class ProductsIngredientsCreatorComponent {
	data = input<RawMaterial>();
	formSubmit = output<ProductsIngredientsFormValue>();
	form = createProductsIngredientsForm();

	rawMaterialsService = inject(RawMaterialsService);
	preparationsService = inject(PreparationsService);

	selectedOption = signal<AutocompleteOption | null>(null);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	measurementUnitOptions = computed(() => {
		const option = this.selectedOption() as RawMaterial;

		if (!option) return [];

		if (option.measurementUnit.id === RawMaterialsMeasurementUnit.KILOGRAMS)
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

		if (option.measurementUnit.id === RawMaterialsMeasurementUnit.LITER)
			return [
				{
					name: "Litro (L)",
					value: RawMaterialsMeasurementUnit.LITER
				},
				{
					name: "Mililitro (ml)",
					value: RawMaterialsMeasurementUnit.MILLILITER
				},
			];

		return [
			{
				name: "Unidade",
				value: RawMaterialsMeasurementUnit.UNIT
			},
		]
	});

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
				return " unidade(s)"
			default:
				return "";
		}
	})
	ingredientTypes: BasicOption[] = [
		{
			name: "Insumo",
			value: 1
		},
		{
			name: "Preparo",
			value: 2
		},
	];


	onSubmit() {
		const value = this.form.getRawValue();

		if (value.measurementUnit === RawMaterialsMeasurementUnit.GRAMS) {
			value.measurementUnit = RawMaterialsMeasurementUnit.KILOGRAMS;
			value.quantity = (value.quantity ?? 0) / 1000;
		}
		if (value.measurementUnit === RawMaterialsMeasurementUnit.MILLILITER) {
			value.measurementUnit = RawMaterialsMeasurementUnit.LITER;
			value.quantity = (value.quantity ?? 0) / 1000;
		}

		this.formSubmit.emit(value);
	}
}