import { Component, inject, output } from '@angular/core';
import { createOrdersImportForm, ImportOrdersPayload } from "./create-orders-import.form";
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
    selector: 'app-orders-import',
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
    templateUrl: './orders-import.component.html',
    styleUrl: './orders-import.component.scss'
})
export class OrdersImportComponent {
	formSubmit = output<ImportOrdersPayload>();

	form = createOrdersImportForm();

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
