import { Component, inject, output } from '@angular/core';
import { createProductsImportForm, ImportProductsPayload } from "./create-products-import.form";
import { toSignal } from "@angular/core/rxjs-interop";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { AutocompleteComponent } from "../../../shared/components/autocomplete/autocomplete.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { NoResultsComponent } from "../../../shared/components/no-results/no-results.component";
import { DOCUMENT } from "@angular/common";
import { FileUploadComponent } from "../../../shared/components/file-upload/file-upload.component";

@Component({
	selector: 'app-products-import',
	standalone: true,
	imports: [
		AutocompleteComponent,
		ButtonComponent,
		FlexRowComponent,
		FormComponent,
		FormInputComponent,
		FormRadioComponent,
		NoResultsComponent,
		FileUploadComponent
	],
	templateUrl: './products-import.component.html',
	styleUrl: './products-import.component.scss'
})
export class ProductsImportComponent {
	formSubmit = output<ImportProductsPayload>();

	form = createProductsImportForm();

	document = inject(DOCUMENT);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}

	addFile() {
		const input = this.document.createElement('input');
		input.type = 'file';

		input.addEventListener('change', () => {
			this.form.controls.file.setValue(Array.from(input.files ?? [])[0])
		});

		input.click();
	}
}
