import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { RawMaterial } from "../../../raw-materials/models/raw-material";
import { createPreparationsIngredientsForm } from "../create-preparations-ingredients-form";
import { PreparationsIngredientsFormValue } from "../../models/preparations-ingredients-form-value";
import { FormInputComponent } from "src/app/shared/components/form/input/form-input.component";
import { FormComponent } from "src/app/shared/components/form/form/form.component";
import { AutocompleteComponent } from "src/app/shared/components/autocomplete/autocomplete.component";
import { RawMaterialsService } from "../../../raw-materials/raw-materials.service";
import { FlexRowComponent } from "src/app/shared/components/flex-row/flex-row.component";
import { FormRadioComponent } from "src/app/shared/components/form/radio/form-radio.component";
import { RawMaterialsMeasurementUnit } from "../../../raw-materials/enums/raw-materials-measurement-unit";
import { AutocompleteOption } from "src/app/shared/components/autocomplete/models/autocomplete-option";
import { ReactiveFormsModule } from "@angular/forms";
import { PreparationIngredientType } from "../../enums/preparation-ingredient-type";
import { BasicOption } from "src/app/shared/models/basic-option";
import { FormValidation } from "src/app/shared/models/form-validation";
import { PreparationsIngredientsForm } from "../../models/preparations-ingredients-form";
import { toSignal } from "@angular/core/rxjs-interop";
import { PreparationIngredient } from "../../models/preparation-ingredient";
import { routeNames } from "src/app/shared/route-names";
import { Preparation } from "../../models/preparation";
import { AutocompleteNoResults } from "src/app/shared/components/autocomplete/no-results/autocomplete-no.results";
import { formValue } from 'src/app/shared/helpers/form-value/form-value';

@Component({
	selector: 'app-preparations-ingredients-creator',
	imports: [
		FormInputComponent,
		FormComponent,
		AutocompleteComponent,
		FlexRowComponent,
		FormRadioComponent,
		ReactiveFormsModule
	],
	templateUrl: './preparations-ingredients-creator.component.html',
	styleUrl: './preparations-ingredients-creator.component.scss'
})
export class PreparationsIngredientsCreatorComponent {
	service = inject(RawMaterialsService);
	title = input("");
	preparation = input<Preparation>(null as any as Preparation);
	data = input<PreparationIngredient>();
	formSubmit = output<PreparationsIngredientsFormValue>();

	noResults = AutocompleteNoResults.showGoToCreation(searchValue => {
		return {
			noResultsIcon: "restaurant",
			destination: {
				url: `${routeNames.rawMaterials}/new`,
				persistForm: {
					key: "raw-materials",
					value: {name: searchValue}
				}
			},
			source: {
				message: `Voltar para o preparo: ${this.preparation().name}`,
				icon: "blender",
			}
		}
	});

	form = createPreparationsIngredientsForm();

	protected PreparationIngredientType = PreparationIngredientType;

	formValue = formValue(this.form);

	ingredient = toSignal(this.form.controls.ingredientType.valueChanges, {
		initialValue: this.form.controls.ingredientType.value,
	});

	selectedOption = signal<AutocompleteOption | null>(null);

	resetFieldsOnIngredientChange = effect(() => {
		this.ingredient();

		this.form.controls.customName.reset();
		this.form.controls.rawMaterialId.reset();
		this.form.controls.customCost.reset();
		this.form.controls.measurementUnit.reset();
		this.form.controls.quantity.reset();

		this.selectedOption.set(null);
	});

	validations: FormValidation<PreparationsIngredientsForm>[] = [
		{
			key: 'rawMaterialId',
			validator: 'required',
			enabled: value => value.ingredientType === PreparationIngredientType.RAW_MATERIAL
		},
		{
			key: "quantity",
			validator: "required",
			enabled: value => value.ingredientType !== PreparationIngredientType.CUSTOM
		},
		{
			key: 'measurementUnit',
			validator: "required",
			enabled: value => value.ingredientType !== PreparationIngredientType.CUSTOM
		},
		{
			key: "customName",
			validator: 'required',
			enabled: value => value.ingredientType === PreparationIngredientType.CUSTOM
		},
		{
			key: "customCost",
			validator: 'required',
			enabled: value => value.ingredientType === PreparationIngredientType.CUSTOM
		},
	];

	ingredientTypes: BasicOption[] = [
		{
			name: "Insumo",
			value: PreparationIngredientType.RAW_MATERIAL
		},
		{
			name: "Personalizado",
			value: PreparationIngredientType.CUSTOM
		},
	];

	measurementUnitOptions = computed(() => {
		const option = this.selectedOption() as RawMaterial;

		if(!option) return [];

		if(option.measurementUnit.id === RawMaterialsMeasurementUnit.KILOGRAMS)
			return [
				{
					name: "Grama (g)",
					value: RawMaterialsMeasurementUnit.GRAMS
				},
				{
					name: "Quilo (kg)",
					value: RawMaterialsMeasurementUnit.KILOGRAMS
				},
			];

		if(option.measurementUnit.id === RawMaterialsMeasurementUnit.LITER) {
			return [
				{
					name: "Mililitro (ml)",
					value: RawMaterialsMeasurementUnit.MILLILITER
				},
				{
					name: "Litro (L)",
					value: RawMaterialsMeasurementUnit.LITER
				},
			];
		}

		return [
			{
				name: "Unidade",
				value: RawMaterialsMeasurementUnit.UNIT
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
				return " unidade(s)"
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
