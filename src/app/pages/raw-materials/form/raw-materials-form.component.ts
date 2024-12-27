import { Component, computed, inject, input, output } from '@angular/core';
import { FormComponent } from "src/app/shared/components/form/form/form.component";
import { RawMaterial } from "../models/raw-material";
import { FormInputComponent } from "src/app/shared/components/form/input/form-input.component";
import { FormRadioComponent } from "src/app/shared/components/form/radio/form-radio.component";
import { BasicOption } from "src/app/shared/models/basic-option";
import { FlexRowComponent } from "src/app/shared/components/flex-row/flex-row.component";
import { RawMaterialsFormValue } from "../models/raw-materials-form-value";
import { toSignal } from "@angular/core/rxjs-interop";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";
import { FormModifier } from "src/app/shared/models/form-modifier";
import { RawMaterialsForm } from "../models/raw-materials-form";
import { createRawMaterialsForm } from "./create-raw-materials-form";
import { AutocompleteComponent } from "src/app/shared/components/autocomplete/autocomplete.component";
import { RawMaterialsCategoriesService } from "../categories/raw-materials-categories.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AutocompleteNoResults } from "src/app/shared/components/autocomplete/no-results/autocomplete-no.results";
import { Generic } from "src/app/shared/models/generic";


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

	noResults = AutocompleteNoResults.autoCreation(() => ({
		noResultsIcon: "category",
		method: ((params: Generic) => this.categoriesService.create(params as any)) as any,
		key: "name"
	}))

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	modifiers: FormModifier<RawMaterialsForm, RawMaterial>[] = [
		{
			key: "measurementUnit",
			modifier: source => source.measurementUnit.id
		},
		{
			key: "categoryId",
			modifier: source => source.category?.id ?? null
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
			name: "Grama (g)",
			value: RawMaterialsMeasurementUnit.GRAMS
		},
		{
			name: "Quilo (kg)",
			value: RawMaterialsMeasurementUnit.KILOGRAMS
		},
		{
			name: "Unidade",
			value: RawMaterialsMeasurementUnit.UNIT
		},
		{
			name: "Mililitro (ml)",
			value: RawMaterialsMeasurementUnit.MILLILITER
		},

		{
			name: "Litro (L)",
			value: RawMaterialsMeasurementUnit.LITER
		},
	];

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
