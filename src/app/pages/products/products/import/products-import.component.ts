import { Component, inject, output } from '@angular/core';
import { createProductsImportForm, ImportProductsPayload } from "./create-products-import.form";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { DOCUMENT } from "@angular/common";
import { FileUploadComponent } from "../../../../shared/components/file-upload/file-upload.component";

@Component({
    selector: 'app-products-import',
	imports: [
		FormComponent,
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
