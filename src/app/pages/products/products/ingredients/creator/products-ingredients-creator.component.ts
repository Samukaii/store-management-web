import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { createProductsIngredientsForm } from "../create-products-ingredients-form";
import { ProductsAddIngredientFormValue } from "../../models/products-add-ingredient-form-value";
import { FormInputComponent } from "../../../../../shared/components/form/input/form-input.component";
import { FormComponent } from "../../../../../shared/components/form/form/form.component";
import { AutocompleteComponent } from "../../../../../shared/components/autocomplete/autocomplete.component";
import { FlexRowComponent } from "../../../../../shared/components/flex-row/flex-row.component";
import { FormRadioComponent } from "../../../../../shared/components/form/radio/form-radio.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { AutocompleteOption } from "../../../../../shared/components/autocomplete/models/autocomplete-option";
import { BasicOption } from "../../../../../shared/models/basic-option";
import { RawMaterialsService } from "../../../../raw-materials/raw-materials.service";
import { PreparationsService } from "../../../../preparations/preparations.service";
import { RawMaterial } from "../../../../raw-materials/models/raw-material";
import { RawMaterialsMeasurementUnit } from "../../../../raw-materials/enums/raw-materials-measurement-unit";
import { FormValidation } from "../../../../../shared/models/form-validation";
import { ProductsAddIngredientForm } from "../../models/products-add-ingredient-form";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductIngredientType } from "../../enums/product-ingredient-type";
import { Product } from "../../models/product";
import { routeNames } from "../../../../../shared/route-names";
import {
	AutocompleteNoResults
} from "../../../../../shared/components/autocomplete/no-results/autocomplete-no.results";

@Component({
	selector: 'app-products-ingredients-creator',
	imports: [
		FormInputComponent,
		FormComponent,
		AutocompleteComponent,
		FlexRowComponent,
		FormRadioComponent,
		ReactiveFormsModule
	],
	templateUrl: './products-ingredients-creator.component.html',
	styleUrl: './products-ingredients-creator.component.scss'
})
export class ProductsIngredientsCreatorComponent {
	data = input<RawMaterial>();
	product = input<Product>(null as any as Product);
	formSubmit = output<ProductsAddIngredientFormValue>();
	form = createProductsIngredientsForm();

	rawMaterialsService = inject(RawMaterialsService);
	preparationsService = inject(PreparationsService);

	selectedOption = signal<AutocompleteOption | null>(null);

	rawMaterialNoResults = AutocompleteNoResults.showGoToCreation(searchValue => ({
		noResultsIcon: "restaurant",
		source: {
			icon: "lunch_dining",
			message: `Voltar para o produto: ${this.product().name}`,
		},
		destination: {
			url: `${routeNames.rawMaterials}/new`,
			persistForm: {
				value: {name: searchValue},
				key: "raw-materials"
			}
		}
	}))

	preparationsNoResults = AutocompleteNoResults.showGoToCreation(searchValue => ({
		noResultsIcon: "blender",
		source: {
			icon: "lunch_dining",
			message: `Voltar para o produto: ${this.product().name}`,
		},
		destination: {
			url: `${routeNames.preparations}/new`,
			persistForm: {
				value: {name: searchValue},
				key: "preparations"
			}
		}
	}))

	ingredient = toSignal(this.form.controls.ingredientType.valueChanges, {
		initialValue: this.form.controls.ingredientType.value,
	});

	resetFieldsOnIngredientChange = effect(() => {
		this.ingredient();

		this.form.controls.customName.reset();
		this.form.controls.rawMaterialId.reset();
		this.form.controls.preparationId.reset();
		this.form.controls.customCost.reset();
		this.form.controls.measurementUnit.reset();
		this.form.controls.quantity.reset();

		this.selectedOption.set(null);
	});

	validations: FormValidation<ProductsAddIngredientForm>[] = [
		{
			key: 'rawMaterialId',
			validator: 'required',
			enabled: value => value.ingredientType === ProductIngredientType.RAW_MATERIAL
		},
		{
			key: 'preparationId',
			validator: 'required',
			enabled: value => value.ingredientType === ProductIngredientType.PREPARATION
		},
		{
			key: "quantity",
			validator: "required",
			enabled: value => value.ingredientType !== ProductIngredientType.CUSTOM
		},
		{
			key: 'measurementUnit',
			validator: "required",
			enabled: value => value.ingredientType !== ProductIngredientType.CUSTOM
		},
		{
			key: "customName",
			validator: 'required',
			enabled: value => value.ingredientType === ProductIngredientType.CUSTOM
		},
		{
			key: "customCost",
			validator: 'required',
			enabled: value => value.ingredientType === ProductIngredientType.CUSTOM
		},
	];

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
			value: ProductIngredientType.RAW_MATERIAL
		},
		{
			name: "Preparo",
			value: ProductIngredientType.PREPARATION
		},
		{
			name: "Personalizado",
			value: ProductIngredientType.CUSTOM
		},
	];


	onSubmit($event: ProductsAddIngredientFormValue) {
		const value = $event;

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

	protected readonly ProductIngredientType = ProductIngredientType;

}
