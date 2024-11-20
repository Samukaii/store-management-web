import { Component, output } from '@angular/core';
import { createOrdersImportForm, ImportOrdersPayload } from "./create-orders-import.form";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { FileUploadComponent } from "../../../shared/components/file-upload/file-upload.component";

@Component({
    selector: 'app-orders-import',
	imports: [
		ButtonComponent,
		FlexRowComponent,
		FormComponent,
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
