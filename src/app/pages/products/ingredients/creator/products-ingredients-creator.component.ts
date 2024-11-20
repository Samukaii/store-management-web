import { Component, computed, inject, input, output } from '@angular/core';
import { FoodInput } from "../../../food-inputs/models/food-input";
import { createProductsIngredientsForm } from "../create-products-ingredients-form";
import { ProductsIngredientsFormValue } from "../../models/products-ingredients-form-value";
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { AutocompleteComponent } from "../../../../shared/components/autocomplete/autocomplete.component";
import { FoodInputsService } from "../../../food-inputs/food-inputs.service";
import { FlexRowComponent } from "../../../../shared/components/flex-row/flex-row.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import {FormRadioComponent} from "../../../../shared/components/form/radio/form-radio.component";
import { FoodInputMeasurementUnit } from "../../../food-inputs/enums/food-input-measurement-unit";
import { toSignal } from "@angular/core/rxjs-interop";
import { BasicOption } from "../../../../shared/models/basic-option";

@Component({
    selector: 'app-products-ingredients-creator',
    imports: [
        FormInputComponent,
        FormComponent,
        AutocompleteComponent,
        FlexRowComponent,
        ButtonComponent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        FormRadioComponent
    ],
    templateUrl: './products-ingredients-creator.component.html',
    styleUrl: './products-ingredients-creator.component.scss'
})
export class ProductsIngredientsCreatorComponent {
	data = input<FoodInput>();
	formSubmit = output<ProductsIngredientsFormValue>();
	form = createProductsIngredientsForm();

	service = inject(FoodInputsService);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	priceTypeOptions: BasicOption[] = [
		{
			name: "Grama",
			value: FoodInputMeasurementUnit.GRAMS
		},
		{
			name: "Unidade",
			value: FoodInputMeasurementUnit.UNIT
		},
	];

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

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
